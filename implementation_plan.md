# Telepítési Terv

A cél a "TT.League Analyzer" weboldal online elérhetővé tétele.
Mivel az alkalmazás **Puppeteert** használ (headless böngésző), a hagyományos statikus tárhely nem elegendő. A **Render.com**-ot fogjuk használni **Dockerrel**, ami egy robusztus és ingyenes/olcsó megoldás Puppeteer alkalmazásokhoz.

## Felhasználói Jóváhagyás Szükséges
> [!IMPORTANT]
> Szükséged lesz egy **GitHub fiókra** és egy **Render.com fiókra** a telepítéshez.
> Én előkészítem a kódot, de neked kell feltöltened a GitHubra és összekötnöd a Renderrel.

## Javasolt Változtatások

### Konfiguráció
#### [ÚJ] [render.yaml](file:///c:/Users/Tomi/PRóba/render.yaml)
- Blueprint konfiguráció létrehozása a Render számára, hogy automatikusan felismerje a Docker szolgáltatást.

### Kódbázis Előkészítése
- Git tároló inicializálása (ha még nincs).
- Minden szükséges fájl kommitolása.

## Ellenőrzési Terv

### Automatizált Tesztek
- Docker image helyi építése (ha van Docker telepítve) az ellenőrzéshez:
  ```bash
  docker build -t tt-analyzer .
  docker run -p 3000:3000 tt-analyzer
  ```

### Manuális Ellenőrzés
- Telepítés után látogasd meg a kapott Render URL-t.
- Ellenőrizd, hogy betölt-e az "Élő Elemző".
- Ellenőrizd a szkrépert a "Frissítés" gombbal, és figyeld meg, hogy megjelennek-e a meccsek.
