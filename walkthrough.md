# Tippmix Real-Time Data Fetcher - Walkthrough

I have implemented the real-time data fetching from Tippmix.hu with the requested odds filtering (min 1.6).

## Changes Made
-   **Proxy Server (`proxy.js`)**: Updated to scrape the specific Tippmix URL, use correct selectors, and filter matches where at least one odd is >= 1.6.
-   **Frontend (`js/data_fetcher.js`)**: Updated to fetch data from the local proxy and generate consistent "mock" statistics (Rating, H2H) for the real players found.

## How to Run

To see the real data, you need to run the proxy server locally.

1.  **Open a Terminal** in the project folder (`c:\Users\Tomi\PRóba`).
2.  **Install Dependencies** (if not already done):
    ```bash
    npm install
    ```
3.  **Start the Proxy Server**:
    ```bash
    node proxy.js
    ```
    You should see: `Proxy server running on http://localhost:3000`
4.  **Open the App**:
    Open `index.html` in your browser (or refresh if already open).
5.  **Refresh Data**:
    Click the **Frissítés** (Refresh) button on the dashboard.
    -   The app will call your local proxy.
    -   The proxy will open a hidden browser, go to Tippmix, scrape the matches, and return them.
    -   You will see real matches with odds >= 1.6!

> [!NOTE]
> The scraping might take a few seconds (5-10s) as it needs to load the Tippmix page.

## Stats Scraper & Engine (Phase 1)

I have implemented the logic to scrape player stats and calculate derived metrics.

### Components
-   **`stats_scraper.js`**: Scrapes match history and player details (Rating, Image) from `tt.league-pro.com`.
    -   Saves matches to `match_history.json`.
    -   Saves players to `players.json`.
    -   Handles dynamic updates (re-running it updates the data).
-   **`stats_engine.js`**: A Node.js module to query the data.
    -   `getPlayer(id)`: Returns name, rating, image.
    -   `getH2H(p1, p2)`: Returns Head-to-Head stats.
    -   `getForm(p1)`: Returns recent match form.

### How to Test
Run the test script to see the engine in action:
```bash
node test_stats.js

## Enhanced Odds Scraper (Phase 2)

I have modularized and improved the Tippmix scraping logic.

### Components
-   **`odds_scraper.js`**: A dedicated module for scraping Tippmix.
    -   Uses robust selectors (`td.title > a` and sibling `td.odds`) to handle table structure.
    -   Filters matches with at least one odd >= 1.60.
    -   Returns standardized match objects.
-   **`proxy.js`**: The API server now imports `odds_scraper.js` instead of having inline scraping logic.
    -   Serves matches at `http://localhost:3000/api/matches`.
    -   Maintains caching (5 minutes) and active hours (07:00-20:00).

### How to Test
Run the test script to verify the scraper in isolation:
```bash
node test_odds.js
```
Or run the proxy server and check the API:
```bash
node proxy.js
# Then open http://localhost:3000/api/matches
```

