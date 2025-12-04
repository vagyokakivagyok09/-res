const fs = require('fs');

const data = JSON.parse(fs.readFileSync('debug_data.json', 'utf8'));

const resolve = (index) => {
    if (typeof index === 'number' && index < data.length) {
        return data[index];
    }
    return index;
};

// Search for "sides" key
let sidesFound = false;
for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj && typeof obj === 'object') {
        if ('sides' in obj) {
            console.log('Found object with sides:', obj);
            sidesFound = true;
            const sides = resolve(obj.sides);
            console.log('Resolved sides:', sides);
            if (Array.isArray(sides)) {
                sides.forEach(s => {
                    console.log('Side ref:', s);
                    const sObj = resolve(s);
                    console.log('Resolved side ref:', sObj);
                    if (sObj.player) {
                        console.log('Player details:', resolve(sObj.player));
                    }
                });
            }
        }
    }
}

if (!sidesFound) {
    console.log('sides NOT found.');
    // Search for any object with surname_en
    console.log('Searching for surname_en...');
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj && typeof obj === 'object' && 'surname_en' in obj) {
            console.log('Found object with surname_en:', obj);
            // Try to see parent
        }
    }
}
