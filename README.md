# TT.League Analyzer

Ez a projekt a TT.League-Pro és a Tippmix adatait elemzi, hogy Value Beteket találjon asztalitenisz mérkőzésekre.

## 📂 Fájlok listája (Ezeket kell feltölteni)

A `git add .` parancs automatikusan ezeket fogja feltölteni, ha a `.gitignore` fájl ott van a mappában.

### 1. Fő Programkódok (Backend)
-   `proxy.js`: A központi szerver. Ez futtatja a weboldalt és az elemzést.
-   `odds_scraper.js`: Tippmix adatgyűjtő modul.
-   `stats_scraper.js`: TT.League adatgyűjtő modul.
-   `stats_engine.js`: Statisztika számoló motor (H2H, Forma).
-   `value_engine.js`: Az elemző, ami összeveti az oddsokat a statisztikákkal.

### 2. Weboldal (Frontend)
-   `index.html`: A főoldal.
-   `css/`: A stílusfájlokat tartalmazó mappa.
-   `js/`: A weboldal működéséért felelős scriptek mappája.

### 3. Adatbázisok (JSON)
-   `players.json`: A játékosok adatai.
-   `match_history.json`: A korábbi meccsek eredményei.
-   `package.json` és `package-lock.json`: A telepítéshez szükséges listák.

---

## 🚀 Telepítés és Futtatás (Szerveren)

1.  **Telepítés:**
    ```bash
    npm install
    ```

2.  **Indítás:**
    ```bash
    npm start
    ```
    (Vagy: `node proxy.js`)

A szerver a 3000-es porton fog futni.
