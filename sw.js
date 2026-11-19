/* Merisää – service worker
 *
 * - Sovelluskuori (index.html, manifest, kuvakkeet): network-first, välimuisti varalla offline-tilassa,
 *   joten uusi julkaisu tulee käyttöön heti kun verkko on saatavilla.
 * - CDN-kirjastot (Leaflet, leaflet-velocity): cache-first (versiot on kiinnitetty URL:iin).
 * - Karttalaatat (OSM / OpenSeaMap): stale-while-revalidate, rajattu koko → aiemmin katsotut alueet
 *   näkyvät myös offline.
 * - Sää-, meri- ja sadetutka-API:t: ei kosketa (sovellus tallentaa säädatan itse localStorageen).
 *
 * Nosta VERSION aina kun precache-lista muuttuu.
 */
const VERSION = 'v4';
const SHELL_CACHE = `merisaa-shell-${VERSION}`;
const LIB_CACHE = `merisaa-lib-${VERSION}`;
const TILE_CACHE = 'merisaa-tiles-v1';
const MAX_TILES = 600;

const SHELL_ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/icon.svg'];
const LIB_ASSETS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/leaflet-velocity@2.1.2/dist/leaflet-velocity.min.css',
  'https://cdn.jsdelivr.net/npm/leaflet-velocity@2.1.2/dist/leaflet-velocity.min.js'
];
const LIB_HOSTS = ['unpkg.com', 'cdn.jsdelivr.net'];
const isTileHost = host => host === 'tiles.openseamap.org' || host.endsWith('.tile.openstreetmap.org') || host === 'tile.openstreetmap.org';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    // Sovelluskuori on pakollinen, CDN-tiedostot yritetään (yksi epäonnistuminen ei kaada asennusta).
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(SHELL_ASSETS);
    const lib = await caches.open(LIB_CACHE);
    await Promise.all(LIB_ASSETS.map(url => lib.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = new Set([SHELL_CACHE, LIB_CACHE, TILE_CACHE]);
    const names = await caches.keys();
    await Promise.all(names.filter(name => !keep.has(name)).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
  return response;
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - maxEntries; i++) await cache.delete(keys[i]);
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(TILE_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request).then(response => {
    if (response && (response.ok || response.type === 'opaque')) {
      return cache.put(request, response.clone()).then(() => trimCache(TILE_CACHE, MAX_TILES)).then(() => response);
    }
    return response;
  });
  if (cached) {
    event.waitUntil(refresh.catch(() => {}));
    return cached;
  }
  return refresh;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    // Vain sovelluksen omat tiedostot (sw.js-päivitystarkistus ohittaa tämän itse).
    if (request.mode === 'navigate') {
      event.respondWith(networkFirst(request, SHELL_CACHE, './index.html'));
    } else if (SHELL_ASSETS.some(asset => new URL(asset, self.location).pathname === url.pathname)) {
      event.respondWith(networkFirst(request, SHELL_CACHE));
    }
    return;
  }

  if (LIB_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(request, LIB_CACHE));
  } else if (isTileHost(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, event));
  }
  // Muut (Open-Meteo, RainViewer, ...) menevät suoraan verkkoon.
});
