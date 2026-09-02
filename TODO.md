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
