import { Locator, Page } from "@playwright/test";

export class PricingPO {
    readonly page: Page
    readonly pricingLink: Locator
    readonly headerText: Locator
    readonly getStartedButton: Locator
    readonly createFreeAccountButton: Locator
    readonly buyNowButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.pricingLink = page.locator("//ul[@class='Navbar_navList__17ESt']/li//a[text()='Pricing']")
        this.headerText = page.locator(".entry-content > div > div > div:nth-child(1) h1")
        this.getStartedButton = page.locator("//a[text()='Get Started']")
        this.createFreeAccountButton = page.locator("//a[text()='Create Your Free Account']")
        this.buyNowButton = page.locator("//a[text()='buy now']")

    }
    /**
     * CLick on the pricing link
     */
    async clickOnThePricingLink() {
        await this.pricingLink.click()
        await this.page.waitForTimeout(4000)
    }
    /**
     * Get header Text of pricing page
     * @returns Header Text
     */
    async getHeaderTextOfPricingPage() {
        return await this.page.$eval(".entry-content > div > div > div:nth-child(1) h1", (el) => el.textContent.trim());
    }
    /**
     *  Click on the get started button of free forever plan
     */
    async clickOnGetStartedButton() {
        await this.getStartedButton.click()
        await this.page.waitForTimeout(4000)
    }
    /**
     * Click on the create free account button of starter plan
     */
    async clickOnCreateFreeAccountButton() {
        await this.createFreeAccountButton.click()
        await this.page.waitForTimeout(4000)
    }
    /**
     * Click on the buy now button of pro plan
     */
    async clickOnBuyNowButton() {
        await this.buyNowButton.click()
        await this.page.waitForTimeout(4000)
    }
}