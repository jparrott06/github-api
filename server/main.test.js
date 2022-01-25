const router = require('./routes/index'),
puppeteer = require('puppeteer');

describe('Github API', () => {

    it('GET /api/getOpenPRs --> Array PullRequest Objects', () => {

    })

})

test('End-to-End Testing --> Repo with No Open Pull Requests', async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    await page.click('input#search-repo');
    await page.type('input#search-repo', 'jparrott06/test');
    await page.click('button');

    await page.waitForSelector('p');

    const noPullsText = await page.$eval('p.no-pulls', el => el.textContent);

    expect(noPullsText).toBe('No Open Pull Requests for this Repo');

    browser.close();

}, 120000);

test('End-to-End Testing --> Repo that does not exist', async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    await page.click('input#search-repo');
    await page.type('input#search-repo', 'NotaUserjdiofjsj/repoNooo');
    await page.click('button');

    await page.waitForSelector('p');

    const errorsText = await page.$eval('p.error', el => el.textContent);

    expect(errorsText).toBe('Error: Request failed with status code 404');

    browser.close();

}, 120000);

test('End-to-End Testing --> Repo with Open Pull Requests', async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    await page.click('input#search-repo');
    await page.type('input#search-repo', 'jparrott06/ChirpyApp');
    await page.click('button');

    await page.waitForSelector('p.total_commits');

    const errorsText = await page.$eval('p.total_commits', el => el.textContent);

    expect(errorsText).toBe('Total Commits: 107');

    browser.close();

}, 120000);
