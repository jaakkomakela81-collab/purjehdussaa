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
