import pkg from '/opt/node-tools/node_modules/playwright/index.js';
const { chromium } = pkg;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:9182/voices/noor-just-write/', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/claude-0/-home-claude/502e155d-f370-521a-b01c-4ca85c924eb9/scratchpad/screenshots/just_write_ar.png', fullPage: true });

await page.click('[data-set-lang="en"]');
await page.waitForTimeout(200);
await page.screenshot({ path: '/tmp/claude-0/-home-claude/502e155d-f370-521a-b01c-4ca85c924eb9/scratchpad/screenshots/just_write_en.png', fullPage: true });
await page.close();

// Also check palestinian-voices listing page includes the new poem
const page2 = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page2.goto('http://localhost:9182/palestinian-voices/', { waitUntil: 'networkidle' });
const hasLink = await page2.evaluate(() => !!document.querySelector('a[href*="noor-just-write"]'));
console.log('Palestinian Voices listing includes new poem link:', hasLink);
await page2.close();

await browser.close();
console.log('done');
