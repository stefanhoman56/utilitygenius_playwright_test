import { FrameLocator, Locator, Page } from "@playwright/test";
import {CreateFreeAccountData} from '../pagedata/PageData';

export class ConfirmEmailPO {
    readonly page: Page
    readonly emailInputField: Locator;
    readonly emailSubmitBtn: Locator;
    readonly inboxFrame : FrameLocator;
    readonly emailFrame: FrameLocator;
    readonly mail: Locator;
    readonly confirmEmailLink: Locator;
    readonly confirmAccountCreation: Locator; 
    readonly upgradeAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInputField = page.locator("input[placeholder='Enter your inbox here']");
        this.emailSubmitBtn = page.locator("button[title='Check Inbox @yopmail.com']");
        this.inboxFrame = page.frameLocator('[name="ifinbox"]');
        this.emailFrame = page.frameLocator('[name="ifmail"]');
        this.mail = this.inboxFrame.locator('text="UtilityGenius"');
        this.confirmEmailLink = this.emailFrame.locator('text="Confirm my account"');
        this.confirmAccountCreation = page.locator("text='You’re all set! Your account has been verified.'");
        this.upgradeAccount = page.locator("text='Upgrade My Account'");
    }

    /*
    = Sign in and got to inbox
    */
    async goToInbox() {
      await this.emailInputField.fill(CreateFreeAccountData.email);
      await this.emailSubmitBtn.click();
      await this.page.waitForTimeout(3000);
    }

    /*
    = Open the mail and click 'confirm your account'
    */
    async clickOnConfirmEmail() {
      await this.mail.click();
      await this.confirmEmailLink.hover();
      await this.confirmEmailLink.click();
      await this.page.waitForTimeout(5000);
    }
}
