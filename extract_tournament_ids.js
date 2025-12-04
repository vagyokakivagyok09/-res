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
// The structure is complex (array of values). We need to find the tournament objects.
// They seem to be in an array.
// In the previous view_file output, I saw:
// "items":59 -> 59 -> [60, 107, 140, ...]
// 60 -> {"id":61, ...} -> 61 -> 30051
// 107 -> {"id":108, ...} -> 108 -> 30066
// 140 -> {"id":141, ...} -> 141 -> 30014

// A generic way to find objects with "id" and "name_en" containing "Tournament" or "League" might work.
// Or better, look for the "items" array which contains the tournament references.

// Let's try to find the array of tournaments.
// It was under `player-previous-tournaments` -> `items`.

// Helper to resolve NUXT references
const resolve = (index) => {
    if (typeof index === 'number' && index < data.length) {
        return data[index];
    }
    return index;
};

// We can dump the whole data to a file to inspect structure if needed, 
// but let's try to find the list of tournaments.
// We look for an object with "pagination" and "items".
let itemsIndex = -1;
for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj && typeof obj === 'object' && 'pagination' in obj && 'items' in obj) {
        itemsIndex = obj.items;
        break;
    }
}

if (itemsIndex === -1) {
    console.error('Could not find items list');
    process.exit(1);
}

const itemsArray = resolve(itemsIndex);
if (!Array.isArray(itemsArray)) {
    console.error('Items is not an array');
    process.exit(1);
}

const tournaments = [];
itemsArray.forEach(idx => {
    const tournamentObj = resolve(idx);
    const idIdx = tournamentObj.id;
    const id = resolve(idIdx);
    const nameIdx = tournamentObj.name_en;
    const name = resolve(nameIdx);
    const dateIdx = tournamentObj.start_at;
    const date = resolve(dateIdx);

    tournaments.push({ id, name, date });
});

console.log(JSON.stringify(tournaments, null, 2));
fs.writeFileSync('tournaments_list.json', JSON.stringify(tournaments, null, 2));
