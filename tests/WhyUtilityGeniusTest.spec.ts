import { test, expect } from "@playwright/test";
import { UtilityGeniusPagePO } from "./pageobjects/UtilityGeniusPagePO";
import { LoginPO } from "../tests/pageobjects/LoginPO";

test.describe(`Verify Utility Genius page  Functionality`, () => {
  test.beforeEach(async ({ page }) => {
    const Login = new LoginPO(page);

    // Step 1: User login with valid credentials
    await page.goto(`/`)
    await Login.enterLoginCredentialsAndClickOnLoginButton();
    await expect(page.url()).toEqual("https://app.utilitygenius.com/");
    await Login.verifyImageLogoIsDisplayed()
  });

  test(`Verify Utility genius page`, async ({ page }) => {
    const UtilityGenius = new UtilityGeniusPagePO(page);

    // Step 1: Click on the why utility genius page link
    await UtilityGenius.clickOnUtilityGeniusLink();
    await page.waitForTimeout(2000);
    await expect(page.url()).toEqual(
      "https://utilitygenius.com/why-utility-genius/"
    );

    // Step 2: Click on the start now button
    await page.waitForTimeout(2000);
    await UtilityGenius.clickOnStartNowButton();
    await expect(page.url()).toEqual("https://app.utilitygenius.com/");

  });
});
