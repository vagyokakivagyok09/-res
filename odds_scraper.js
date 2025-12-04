const puppeteer = require('puppeteer');
const fs = require('fs');

let browser = null;

async function getBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browser;
}

/**
 * Scrape odds from Tippmix
 * @returns {Promise<Array>} List of matches with odds
 */
async function scrapeOdds() {
    try {
        const browser = await getBrowser();
        const page = await browser.newPage();

        // Set User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');

        // Block resources
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        console.log('Navigating to Tippmix...');
        const targetUrl = 'https://www.tippmix.hu/sportfogadas#?sportid=20&countryid=38014&competitionid=57388&competitiontype=competition&minOdds=1&maxOdds=10';

        await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for match list
        try {
            console.log('Waiting for selectors...');
            await page.waitForSelector('a span', { timeout: 5000 });
        } catch (e) {
            console.log('Timeout waiting for selector (likely no matches).');
            // Don't return yet, let's see if we can find anything or save debug
        }

        console.log('Scraping data...');
        const matches = await page.evaluate(() => {
            const results = [];
            // New selector based on observation: a.ng-scope seems to be the main container for match info
            // But let's be more generic to be safe. The match rows usually have a specific structure.
            // Let's try to find rows that contain both names and odds.

            // It seems matches are often in 'div.event-row' or similar, but based on the subagent report:
            // The link is 'a.ng-scope'. Let's look for elements that have the player names.

            // Strategy: Find all elements that look like match rows.
            // Inspecting the "A. Hlawatschke - P. Stehlik" text suggests it's in a span.

            const matchElements = document.querySelectorAll('.event-row, .match-row, div[ng-repeat*="event"]'); // Trying generic classes first, but let's stick to what we saw if possible.

            // Fallback: iterate over all 'a' tags and check content
            const allLinks = document.querySelectorAll('a');

            allLinks.forEach(link => {
                try {
                    const nameSpan = link.querySelector('span.name') || Array.from(link.querySelectorAll('span')).find(s => s.textContent.includes(' - '));
                    const dateSpan = link.querySelector('span.date') || Array.from(link.querySelectorAll('span')).find(s => s.textContent.match(/\d{2}\.\d{2}\./));

                    if (nameSpan && dateSpan) {
                        const nameText = nameSpan.textContent.trim();
                        const time = dateSpan.textContent.trim();

                        const [playerA, playerB] = nameText.split(' - ').map(s => s.trim());

                        // Odds are usually siblings or children of a parent container
                        // Let's find the parent row
                        const parentRow = link.closest('div.event-row') || link.closest('tr') || link.parentElement.parentElement;

                        const odds = {};
                        if (parentRow) {
                            const oddsButtons = parentRow.querySelectorAll('button.btn-odds');
                            oddsButtons.forEach(btn => {
                                const marketDiv = btn.querySelector('div.market-name') || btn.querySelector('div');
                                const valueSpan = btn.querySelector('span.odd-value') || btn.querySelector('span');

                                if (marketDiv && valueSpan) {
                                    const market = marketDiv.textContent.trim();
                                    const value = parseFloat(valueSpan.textContent.replace(',', '.'));
                                    odds[market] = value;
                                }
                            });
                        }

                        // Filter by Odds (Min 1.6)
                        const hasHighOdd = Object.values(odds).some(val => val >= 1.6);

                        if (hasHighOdd) {
                            results.push({
                                time,
                                playerA,
                                playerB,
                                odds,
                                raw_date: new Date().toISOString()
                            });
                        }
                    }
                } catch (err) {
                    // console.log('Error parsing match', err);
                }
            });

            return results;
        });

        if (matches.length === 0) {
            console.log('No matches found. Saving debug_odds.html...');
            const html = await page.content();
            fs.writeFileSync('debug_odds.html', html);
        }

        await page.close();
        return matches;

    } catch (error) {
        console.error('Scraping failed:', error);
        throw error;
    }
}

module.exports = { scrapeOdds };
