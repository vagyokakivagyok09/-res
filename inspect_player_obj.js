const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('debug_player_page.html', 'utf8');
const $ = cheerio.load(html);

const scriptContent = $('#__NUXT_DATA__').html();
if (!scriptContent) {
    console.error('No __NUXT_DATA__ found');
    process.exit(1);
}

const data = JSON.parse(scriptContent);

const resolve = (index) => {
    if (typeof index === 'number' && index < data.length) {
        return data[index];
    }
    return index;
};

// Find a player object. 
// We know from stats_scraper.js that player objects are inside 'meet_players' or similar.
// Let's just search for any object that has 'surname_en' and 'first_name_en'.

for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj && typeof obj === 'object' && 'surname_en' in obj) {
        console.log('Found player object:', obj);
        // Also resolve keys if they are indices
        const resolvedObj = {};
        for (const key in obj) {
            resolvedObj[key] = resolve(obj[key]);
        }
        console.log('Resolved player object:', resolvedObj);
        break;
    }
}
