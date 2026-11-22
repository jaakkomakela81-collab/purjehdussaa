# TODO

- [x] Tarkista olemassa oleva HTML-rakenne ja tunnista puuttuvat ominaisuudet
- [x] Yhdistä sadetutka, tuuli-, merivirta- ja GPS-seurannan logiikka yhdeksi toimivaksi sivustoksi
- [x] Korjaa GitHubin uusimman version yhdistämisvirheet: kahteen kertaan määritelty reittikirjasto,
      `btnClear`/`clearRouteState`-logiikan eriytyminen (jätti vanhan säädatan muistiin reitin vaihdossa),
      186 erillisen hakupyynnön korvaaminen 4:llä koontikyselyllä, tuuli/virta-animaation pätkiminen,
      hilan vääristyminen puuttuvan merivirtadatan kohdalla, mittarin valinnan toimimattomuus 0 %:n
      liu'ussa, liu'un käsisäädön peruuntuminen, ja PWA-offline-tuen palauttaminen.
- [ ] Tarkista toimivuus selaimessa: kartan lataus, sadetutka, tuuli/virta-animaatiot, GPS-seuranta,
      reittikirjaston tallennus/lataus, ja offline-toiminta (PWA)
- [x] Lisää "Ehdota paras lähtöaika" -toiminto: hakee sää-/meridatan 7 vrk päähän asti
      (`forecast_days=7` kaikkiin hakuihin, aiemmin Meri-API palautti oletuksena vain 5 vrk),
      etsii tunneittain koko reitin keskimäärin parhaan sään 0–7 vrk sisällä nykyhetkestä, ja
      näyttää tuloksen mukana vuorokaudenajan (aamuyö/aamupäivä/iltapäivä/ilta). Täydentää
      käsinsyöttöä, ei korvaa sitä.
- [ ] Tarkista selaimessa myös "Ehdota paras lähtöaika": ehdotuksen järkevyys, liu'un 0–7 vrk
      -toiminta, ja tapaus jossa ennustedataa ei ole vielä haettu
- [x] Vuorokaudenajan valinta "Ehdota paras lähtöaika" -hakuun (Mikä tahansa/Aamuyö/Aamupäivä/
      Iltapäivä/Ilta), Käännä-nappi siirtää veneen heti reitin uuteen alkuun, ja Hae sää -painike
      sulkee asetuspaneelin automaattisesti onnistuneen haun jälkeen
- [x] PWA/offline kuntoon: oma `sw.js` (blob:-URL-rekisteröinti ei toiminut), `manifest.json` ja kuvakkeet.
      Sovelluskuori network-first (uusi julkaisu tulee heti käyttöön), CDN-kirjastot cache-first,
      karttalaatat stale-while-revalidate (max 600 kpl). Säädata luetaan käynnistyksessä localStoragesta
      ja sen ikä näytetään.
- [x] Puuttuvan datan käsittely: puuttuva arvo ei enää muutu nollaksi eikä "hyväksi säksi" (`null` →
      "--", neutraali väri, harmaa katkoviiva reitillä), kokonaisarvosana lasketaan vain saatavilla
      olevista tekijöistä, ja ennusteen ulkopuolinen ajankohta ei enää näytä tunnin 0 dataa.
      Haku: `res.ok`-tarkistus, Open-Meteon virheviestit, yksi uusintayritys 5xx/verkkovirheessä,
      meridata valinnainen, atomaarinen sijoitus ja localStorage-täyttymisen käsittely.
- [ ] Tarkista oikealla laitteella: PWA:n asennus kotinäytölle ja offline-käynnistys (iOS Safari + Android Chrome)
- [x] Turvarajat (max tuuli/puuska/aallokko, oletus 12 m/s / 16 m/s / 2 m, tallentuvat laitteelle):
      varoitus reitin alla kun raja ylittyy valitulla lähtöajalla; puuskat mukaan vaikeusarvioon
      (14 m/s → 22 m/s); "Ehdota paras lähtöaika" karsii ensin rajojen ylitykset ja vertaa sitten
      0,5 × keskiarvo + 0,5 × vaikein kohta. Kertoo selvästi, jos kaikki vaihtoehdot ylittävät rajan.
- [ ] Säädä oletusrajat omalle veneelle (nykyiset ovat yleisarvaus)
- [x] Ennustekaavio (📈-painike kartalla): tuuli+puuska (m/s) ja aallokko (m) tunneittain, pahin arvo
      reitin varrella; turvarajat viivoina, ylitystunnit punaisella taustalla, reitin kesto harmaana.
      Napautus/klikkaus asettaa lähtöajan, nuolinäppäimet + Enter toimivat, taulukkonäkymä päivittäin.
- [x] "Ehdota paras lähtöaika" näyttää top 3 -vaihtoehdon (väh. 6 h välein, syyt: tuuli-, puuska- ja
      aaltoväli, rajojen tila); valinta asettaa lähtöajan.
- [ ] Tarkista kaavion luettavuus oikealla puhelimella (iPhone SE -kokoinen näyttö, aurinko)
- [x] Käännä-painike myös kartalla (⇅), koska asetuspaneeli sulkeutuu haun jälkeen. Korjattu: käännös
      kääntää nyt myös ladatun säädatan ja offline-välimuistin (aiemmin veneen kohdalle näytettiin
      vanhan reitin toisen pään sää). Tyhjennys poistaa Hae sää/Käännä-painikkeet käytöstä.
- [ ] Suomalaiset (FMI) ja ruotsalaiset (SMHI) säälähteet: odottaa verkkoyhteyttä kehitysympäristöstä
      rajapintojen testaamiseksi (ks. keskustelu)

## Seuraavaksi (kirjattu 22.11.2026)

Huom. verkollinen istunto: sallittuihin verkkotunnuksiin tarvitaan `opendata.fmi.fi`,
`opendata-download-metfcst.smhi.se`, `api.open-meteo.com`, `marine-api.open-meteo.com` ja ORC-hakua
varten `data.orc.org` (tai laajempi verkkotaso).

### FMI/SMHI-haaran yhdistäminen
- [ ] Yhdistä haara `claude/confident-maxwell-99mhln` (commit ec354e1: Sääennusteen lähde -valinta,
      FMI + SMHI + Open-Meteo-varakäyttö) `main`iin. Haara ei ole vielä `main`issa eli julkaistussa
      sovelluksessa (yllä oleva FMI/SMHI-rivi on tämän haaran puolella vielä "odottaa"-tilassa).
      Yhdistäminen aiheuttaa pienen ristiriidan TODO.md:n lopussa: ota molemmat puolet.
      Tarkistettu 22.11.: kaikki 60 aiempaa testiä menevät läpi sen koodilla + 13 mock-testiä (SMHI-arvot,
      interpolointi, kattavuuden jälkeen Open-Meteo, 429 → SMHI yksin, SMHI 500 → varakäyttö, FMI 400 →
      varakäyttö) → 73/73.
- [ ] Testaa FMI ja SMHI oikeilla rajapinnoilla verkollisessa istunnossa. Erityisesti FMI:n onnistuneen
      vastauksen XML-jäsennys (multipointcoverage) ei ole mock-testattu. Vertaa arvoja Open-Meteoon
      oikealla reitillä ja tarkista SMHI:n kattavuus Suomenlahdella.
- [ ] Korjaa: lähdeilmoitus (`weatherSourceNote`) katkeaa kapeassa ilmoituspalkissa (nowrap + ellipsis,
      max-width 80vw) → näytä lähde ja kattavuus pysyvästi, esim. kaavion otsikossa ja datan iän vieressä
      (todennäköinen ongelma puhelimella, tarkista oikealla laitteella).
- [ ] Korjaa: `clearRouteState` ei nollaa `weatherSourceNote`a (vanha teksti voi jäädä näkyviin).
- [ ] Harkitse "Pahin lähteistä" -yhdistelmää turvarajoihin: SMHI:n 6 h askeleiden interpolointi tasoittaa
      huippuja ja voi aliarvioida puuskia.

### Veneprofiili (Botnia 6) ja polaarit
Tavoite: käyttäjä valitsee veneen tyypin asetuksista ja sovellus ottaa sen huomioon ennusteessa
(matka-aika, ETA, turvarajat) sekä antaa sääperusteisia vinkkejä (esim. reivaus). Vene: **Botnia 6**.
Nykytila: matka-aika lasketaan kiinteällä nopeudella (`segmentSpeeds` / `speed`-kenttä,
`getExactRouteGeometry`), joten tuuli ei vaikuta ETA:an.
- [ ] Selvitä Botnia 6:n mitat ja ominaisuudet (LOA, LWL, uppouma, painolasti, purjepinta-ala, koneen
      matkanopeus). Älä arvaa: haetaan lähteestä ja käyttäjä varmistaa luvut.
- [ ] Veneprofiili asetuksiin: esiasetukset (Botnia 6 ensimmäisenä + muutama yleinen kokoluokka) ja omat
      mitat. Tallennus laitteelle (localStorage), kuten turvarajoilla.
- [ ] Polaari profiilista: parametrinen malli (LWL → runkonopeus, SA/D- ja D/L-suhteet → polaarin muoto),
      matka-aika ja ETA tuulen mukaan (vastatuulessa kryssi + kääntöhäviö, kovassa myötätuulessa
      nopeammin), koneajo kun tuuli on heikko (raja säädettävä), merivirran vaikutus. Näytä selvästi,
      että nopeudet ovat arvioita. Ei saa rikkoa nykyistä käsin annettua nopeutta (säilytä "kiinteä
      nopeus" -tila).
- [ ] Sääperusteiset vinkit (liukusäätimen readout + kaavio): esim. 1. ja 2. reivi, puuskavaroitus,
      vastaaalto/kovan tuulen vastaisuus, koneajo. Raja-arvot skaalautuvat veneen mukaan ja ovat
      käyttäjän muokattavissa. Merkittävä ohjeelliseksi arvioksi, ei turvatakuuksi (skipperi päättää).
- [ ] Turvarajojen oletukset veneprofiilista (nykyiset 12 / 16 m/s / 2 m ovat yleisarvaus).
- [ ] ORC-haku (vaatii verkon): julkiset todistukset `data.orc.org`, bulk-lataus maittain
      (`WPub.dll?action=DownRMS&CountryId=FIN&Family=ORC&ext=json`, ORC:n PCS-sivun mukaan, käyttöehdot ja
      toimivuus testattava), yksittäinen vene nimellä/purjenumerolla; todistuksessa mitat + VPP-nopeudet
      → polaari. Yhteisön työkalu: github.com/jieter/orc-data. ORC-polaarit ovat liian optimistisia
      matkapurjehtijalle → säädettävä "matkapurjehdus"-kerroin (oletus < 1). Tarkista, onko Botnia 6
      ORC-rekisterissä; jos ei, parametrinen malli.
- [ ] Polaarin kalibrointi GPS-lokista (oma vene vs. malli) – myöhemmin.

### Muut ideat alkuperäisestä parannuslistasta
- [ ] Solmut oletusyksiköksi (tuuli nyt m/s) tai valinta; Beaufort-asteikko.
- [ ] Yötila (punainen/himmeä) yöpurjehdukseen.
- [ ] GPS: oikea ETA nykyisellä nopeudella, kurssipoikkeama (XTE), ankkurihälytys, GPX-vienti/-tuonti.
- [ ] Reitin jako (URL-parametri tai QR).
- [ ] Koodin jako tiedostoihin (index.html / style.css / app.js tai ES-moduulit) ja yksikkötestit
      pisteytyslogiikalle (Playwright-testit ovat toistaiseksi vain istunnon scratchpadissa, ei repossa).
- [ ] Säädatan pisteitä vain 12 reitin varrella: sovita reitin pituuteen (kasvattaa API-kutsun kokoa).
