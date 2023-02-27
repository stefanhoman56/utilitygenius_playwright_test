import { expect, Locator, Page } from "@playwright/test";
import { LoginData, CreateFreeAccountData } from "../pagedata/PageData";

export class LoginPO {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly emailTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;
  readonly appLogo: Locator;
  readonly upgradeAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("text='Sign In' >> nth=0");
    this.emailTextBox = page.locator("input[name='email']");
    this.passwordTextBox = page.locator("input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
    this.appLogo = page.locator("#logo");
    this.upgradeAccountBtn = page.locator("text='Upgrade My Account' >> nth=0");
  }
  /**
   * Enter username, password, and click on the login button
   */
  async enterLoginCredentialsAndClickOnLoginButton() {
    let countSignInBtn = await this.page
      .locator("text='Sign In' >> nth=0")
      .count();
    if (countSignInBtn > 0) {
      await this.signInButton.click();
    }

    await this.emailTextBox.fill(LoginData.email);
    await this.passwordTextBox.fill(LoginData.password);
    await this.loginButton.click();
    await this.page.waitForSelector("text='Upgrade My Account'");
  }
  /**
   * Enter username, password, and click on the login button
   */
  async enterLoginCredentialsAndClickOnLoginButtonFreeAccount() {
    await this.signInButton.click();
    await this.emailTextBox.fill(CreateFreeAccountData.email);
    await this.passwordTextBox.fill(CreateFreeAccountData.password);
    await this.loginButton.click();
    await this.page.waitForTimeout(11000);
  }
  /**
   * Enter invalid login credentials and click on the login button
   */
  async enterInvalidLoginCredentialsAndClickOnLoginButton() {
    await this.signInButton.click();
    await this.emailTextBox.fill(LoginData.email);
    await this.passwordTextBox.fill(LoginData.invalidPassword);
    await this.loginButton.click();
    await this.page.waitForTimeout(4000);
  }

  /**
   * Get error message
   * @returns  Error message
   */
  async getErrorMessage() {
    return await this.page.$eval(
      "div.auth0-global-message > span > span",
      (el) => el.textContent.trim()
    );
  }
  /**
   * Verify image logo is displayed
   */
  async verifyImageLogoIsDisplayed() {
    var locator = await this.page.locator("//header//a//div >> nth=0");
    await expect(locator).toBeVisible();
  }
  /**
   * Verify upgrade account button is displayed
   */
  async verifyUpgradeAccountVisible() {
    await expect(this.upgradeAccountBtn).toBeVisible();
  }
}
