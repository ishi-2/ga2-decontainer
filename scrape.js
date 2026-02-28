import { chromium } from 'playwright';

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const allSums = [];
    const urls = [
      'https://sanand0.github.io/tdsdata/js_table/?seed=26',
      'https://sanand0.github.io/tdsdata/js_table/?seed=27',
      'https://sanand0.github.io/tdsdata/js_table/?seed=28',
      'https://sanand0.github.io/tdsdata/js_table/?seed=29',
      'https://sanand0.github.io/tdsdata/js_table/?seed=30',
      'https://sanand0.github.io/tdsdata/js_table/?seed=31',
      'https://sanand0.github.io/tdsdata/js_table/?seed=32',
      'https://sanand0.github.io/tdsdata/js_table/?seed=33',
      'https://sanand0.github.io/tdsdata/js_table/?seed=34',
      'https://sanand0.github.io/tdsdata/js_table/?seed=35'
    ];

    for (const url of urls) {
      console.log(`Visiting: ${url}`);
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('table', { timeout: 10000 });

      const numbers = await page.$$eval('table td, table th', cells => {
        const nums = [];
        for (const cell of cells) {
          const text = cell.textContent.trim();
          const num = parseFloat(text.replace(/[^\d.-]/g, ''));
          if (!isNaN(num)) nums.push(num);
        }
        return nums;
      });

      const pageSum = numbers.reduce((acc, n) => acc + n, 0);
      allSums.push(pageSum);
      console.log(`Numbers found: ${numbers.length}, Sum for ${url}: ${pageSum}`);
      await page.close();
    }

    const grandTotal = allSums.reduce((acc, sum) => acc + sum, 0);
    console.log(`GRAND TOTAL SUM: ${grandTotal}`);
    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
})();
