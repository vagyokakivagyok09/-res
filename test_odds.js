const oddsScraper = require('./odds_scraper');

(async () => {
    console.log('Testing Odds Scraper...');
    try {
        const matches = await oddsScraper.scrapeOdds();
        console.log(`Found ${matches.length} matches.`);

        matches.forEach((m, i) => {
            console.log(`\nMatch ${i + 1}:`);
            console.log(`  Time: ${m.time}`);
            console.log(`  Players: ${m.playerA} vs ${m.playerB}`);
            console.log(`  Odds:`, m.odds);
        });

    } catch (err) {
        console.error('Test failed:', err);
    }
    process.exit(0);
})();
