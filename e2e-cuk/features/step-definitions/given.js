const {
  Given,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");
// const { expect } = require("chai");

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

Given("I am on the {string} page", async function (url) {
  await page
    .goto(`${url}`, {
      waitUntil: "networkidle0",
    })
    .catch(() => {});
});
