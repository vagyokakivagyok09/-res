const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('debug_tippmix.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Inspecting Tippmix HTML ---');

// Try to find match containers
const matchLinks = $('a.ng-scope');
console.log(`Found ${matchLinks.length} match links (a.ng-scope).`);

matchLinks.each((i, el) => {
    if (i > 2) return; // Only check first 3

    const link = $(el);
    console.log(`\nMatch ${i + 1}:`);

    // Time
    const timeSpan = link.find('span > span');
    console.log(`  Time: ${timeSpan.text().trim()}`);

    // Players
    // The previous logic looked for a span with " - "
    let nameText = "N/A";
    link.find('span').each((j, span) => {
        const text = $(span).text();
        if (text.includes(' - ')) {
            nameText = text.trim();
        }
    });
    console.log(`  Players: ${nameText}`);

    // Odds
    // In Cheerio, we can look at next siblings
    let sibling = link.next();
    let safety = 0;
    while (sibling.length > 0 && safety < 10) {
        if (sibling.is('button.btn-odds')) {
            const market = sibling.find('div').first().text().trim();
            const value = sibling.find('span').first().text().trim();
            console.log(`  Odd: ${market} = ${value}`);
        }
        sibling = sibling.next();
        safety++;
    }
});
