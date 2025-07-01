import { chromium } from "playwright";
import { expect } from "chai";

describe("Cross-Page Tests", function () {
  this.timeout(30000);

  let browser, context, page;

  beforeEach(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(async function () {
    await browser.close();
  });

  it("referrer should be filled when navigating from Hood River", async function () {
    try {
      // Navigate to Hood River page
      await page.goto("http://localhost:3000/tours/hood-river", {
        waitUntil: "domcontentloaded",
      });

      // Click the link and wait for navigation
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
        page.click(".requestGroupRate"),
      ]);

      // Verify the hidden input exists and has the correct value
      const referrerValue = await page.evaluate(() => {
        const input = document.querySelector('input[name="referrer"]');
        return input ? input.value : null;
      });

      console.log("Referrer value:", referrerValue);
      expect(referrerValue).to.equal("http://localhost:3000/tours/hood-river");
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });

  it("referrer should be filled when navigating from Oregon Coast", async function () {
    try {
      await page.goto("http://localhost:3000/tours/oregon-coast", {
        waitUntil: "domcontentloaded",
      });

      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
        page.click(".requestGroupRate"),
      ]);

      const referrerValue = await page.evaluate(() => {
        return document.querySelector('input[name="referrer"]').value;
      });

      console.log("Referrer value:", referrerValue);
      expect(referrerValue).to.equal(
        "http://localhost:3000/tours/oregon-coast"
      );
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });

  it("referrer should be empty when going directly", async function () {
    try {
      await page.goto("http://localhost:3000/tours/request-group-rate", {
        waitUntil: "domcontentloaded",
      });

      const referrerValue = await page.evaluate(() => {
        return document.querySelector('input[name="referrer"]').value;
      });

      console.log("Referrer value:", referrerValue);
      expect(referrerValue).to.equal("");
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});
