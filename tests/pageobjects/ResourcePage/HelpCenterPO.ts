import { Locator, Page } from "@playwright/test";

export class HelpCenterPO {
    readonly page: Page
    readonly seeTheGuideButton: Locator
    readonly giveFeedBackButton: Locator
    readonly emailTextBox: Locator
    readonly subjectTextBox: Locator
    readonly descriptionTextBox: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        this.page = page
        this.seeTheGuideButton = page.locator("//a[text()='See the Guide']")
        this.giveFeedBackButton = page.locator("//a[text()='Give Feedback']")
        this.emailTextBox = page.locator("input[name='email']")
        this.subjectTextBox = page.locator("input[name='TICKET.subject']")
        this.descriptionTextBox = page.locator("textarea")
        this.submitButton = page.locator("input[type='Submit']")
    }
    /**
     * Click on the see guide button
     */
    async clickOntheSeeGuideButton() {
        await this.seeTheGuideButton.click()
    }
    /**
     * Click on the give feedback button
     */
    async clickOnTheGiveFeedBackButton() {
        await this.giveFeedBackButton.click()
    }
    /**
     * Fill helpdesk form and click on the submit button
     * @param email  user Email
     * @param subject Subject of problem
     * @param description  Description of problem
     */
    async enterFormDetails(email, subject, description) {
        await this.page.frameLocator("#hs-form-iframe-0").locator("input[name='email']").type(email)
        await this.page.waitForTimeout(2000)
        await this.page.frameLocator("#hs-form-iframe-0").locator("input[name='TICKET.subject']").type(subject)
        await this.page.frameLocator("#hs-form-iframe-0").locator("textarea").type(description)
        await this.page.frameLocator("#hs-form-iframe-0").locator("input[type='Submit']").click()
    }
    // /**
    //  * Get success Message after successfully submit form
    //  * @returns Success Message
    //  */
    // async getSuccessMessage() {
    //     await this.page.waitForTimeout(2000)
    //     // await this.page.$eval(headerText.locator("strong"), (text) => text.textContent.trim())
    //     // return await this.page.$eval('div.hbspt-form strong', (el) => this.page.frameLocator("#hs-form-iframe-0").locator('div.hbspt-form strong').textContent)
    // }
}