const stats = require('./stats_engine');

// Test IDs (from match_history.json)
// 1079 seems to be a common player in the sample data
const PLAYER_ID = 1078;
const OPPONENT_ID = 1606; // Found in match history

console.log('--- Player Stats ---');
const player = stats.getPlayer(PLAYER_ID);
console.log('Player:', player);

console.log('\n--- Form (Last 5) ---');
const form = stats.getForm(PLAYER_ID, 5);
console.log(form);

console.log(`\n--- H2H vs ${OPPONENT_ID} ---`);
const h2h = stats.getH2H(PLAYER_ID, OPPONENT_ID);
console.log(`Wins: ${h2h.p1Wins} - ${h2h.p2Wins} (Total: ${h2h.totalMatches})`);
console.log('Recent H2H Matches:');
h2h.matches.forEach(m => {
    console.log(`  ${m.date}: ${m.scoreOne}-${m.scoreTwo} (Winner: ${m.winnerId})`);
});
