import {Locator, Page } from "@playwright/test";
import {CreateFreeAccountData} from '../pagedata/PageData';

export class CreateFreeAccountPO {
    readonly page: Page
    readonly email: Locator;
    readonly password: Locator;
    readonly fullname : Locator;
    readonly signUpBtn: Locator;
    readonly loginBtn: Locator;
    readonly confirmAccountCreation: Locator;
    readonly upgradeAccount: Locator;
    readonly createFreeAccountBtn: Locator;
    readonly googleSignupBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator("input[placeholder='yours@example.com']");
        this.password = page.locator("input[placeholder='your password']");
        this.fullname = page.locator("input[placeholder='your full name']");
        this.signUpBtn = page.locator(".auth0-label-submit");
        this.upgradeAccount = page.locator("text='Upgrade My Account'");
        this.createFreeAccountBtn = page.locator("li.Navbar_topMenuTryButton__1kCAG >> nth=1");
        this.googleSignupBtn = page.locator(".auth0-lock-social-button-text");
    }

    /*
    = Filling up the input fields and Clicking the 'Sign up' button
    */
    async signUp() {
      await this.email.fill(CreateFreeAccountData.email);
      await this.password.fill(CreateFreeAccountData.password);
      await this.fullname.fill(CreateFreeAccountData.fullName);
      await this.signUpBtn.click();
      await this.page.waitForTimeout(3000);
    }
}