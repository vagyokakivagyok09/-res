# Rendszer Működése és Kiválasztási Logika

Ez a dokumentum pontosan leírja, hogyan választja ki a rendszer a megjelenítendő mérkőzéseket.

## 1. Adatforrás (A "Megfigyelés")
A rendszer **kizárólag** az alábbi linket figyeli:
- **URL:** `https://www.tippmix.hu/sportfogadas#?sportid=20&countryid=38014&competitionid=57388&competitiontype=competition&minOdds=1&maxOdds=10`
- **Tartalom:** Cseh Liga Pro Asztalitenisz mérkőzések.

## 2. Működési Időablak
A rendszer csak az alábbi időszakban aktív:
- **Kezdés:** Reggel **07:00**
- **Leállás:** Este **20:00**
- Ezen időszakon kívül a rendszer nem keres, és üres listát ad vissza.

## 3. A Kiválasztás Menete (A "Döntés")
A rendszer minden egyes letöltött meccsnél az alábbi lépéseket hajtja végre:

1.  **Időpont és Nevek Keresése:** Megnézi, van-e érvényes kezdési időpont és játékos név. Ha nincs, a meccset kihagyja.
2.  **Szorzók (Oddsok) Begyűjtése:** Összeszedi az adott meccshez tartozó összes elérhető szorzót (pl. Hazai, Vendég).
3.  **A Szűrő Feltétel (A Minimum Követelmény):**
    A rendszer megvizsgálja a szorzókat.
    - **Szabály:** Legalább **EGY** szorzónak el kell érnie vagy meg kell haladnia az **1.60**-as értéket.
    - **Matematikailag:** `Odds >= 1.60`

    *Példa:*
    - Ha a szorzók: `1.45` és `2.10` -> **MEGFELEL** (mert 2.10 >= 1.60).
    - Ha a szorzók: `1.50` és `1.55` -> **NEM FELEL MEG** (egyik sem éri el az 1.60-at).

## 4. Adatfrissítés (Cache)
- Ha a felhasználó frissítést kér, a rendszer először megnézi, hogy van-e **5 percnél frissebb** mentett adata.
- Ha **VAN**: Azonnal azt mutatja (nem tölti le újra az oldalt).
- Ha **NINCS**: Újra letölti az oldalt a Tippmixről, lefuttatja a fenti szűrést, és elmenti az eredményt 5 percre.
