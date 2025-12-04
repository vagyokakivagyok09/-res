const valueEngine = require('./value_engine');

(async () => {
    console.log('Testing Value Analyzer...');
    try {
        const bets = await valueEngine.findValueBets();

        console.log(`\nFound ${bets.length} Value Bets:`);
        bets.forEach((bet, i) => {
            console.log(`\n--- Bet #${i + 1} ---`);
            console.log(`Match: ${bet.match} (${bet.time})`);
            console.log(`Odds:`, bet.odds);
            console.log(`Stats:`, bet.stats);
            console.log(`Reason:`, bet.analysis.reason);
        });

    } catch (err) {
        console.error('Test failed:', err);
    }
    process.exit(0);
})();
