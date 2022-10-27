import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import { LoginData } from "./pagedata/PageData";

test.describe(`Verify Login Functionality`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
  });

  test(`Verify that user successfully login into the website`, async ({
    page,
  }) => {
    const Login = new LoginPO(page);

    // Step 1: User login with valid credentials
    await Login.enterLoginCredentialsAndClickOnLoginButton();

    // Step 2: Verify home page URl
    await expect(page.url()).toEqual("https://app.utilitygenius.com/");
    await Login.verifyImageLogoIsDisplayed();
  });
  test(`Verify that Error message is displayed when user enter invalid login credentials`, async ({
    page,
  }) => {
    const Login = new LoginPO(page);

    // Step 1: User login with invalid credentials
    await Login.enterInvalidLoginCredentialsAndClickOnLoginButton();

    // Step 2: Verify error message
    var errorMessage = await Login.getErrorMessage();
    expect(errorMessage).toEqual(LoginData.errorMessage);
  });
});
