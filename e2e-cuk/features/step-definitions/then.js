const {
  Then,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("chai");

let page;
let browser;

setDefaultTimeout(50 * 1000);

BeforeAll(async () => {
  browser = process.env.GITHUB_ACTIONS
    ? await chromium.launch({ headless: false })
    : await chromium.launch({ headless: false });
  page = await browser.newPage();
});

AfterAll(() => {
  if (!page.isClosed()) {
    browser.close();
  }
});

Then("I can see the title {string} on the page", async function (header) {
  // Write code here that turns the phrase above into concrete actions
  await page.goto("https://www.google.com/", {
    waitUntil: "networkidle0",
  });
  const title = await page.$eval("title", (el) => el.textContent);
  expect(title).to.equal(header);
});
