import { Locator, Page } from "@playwright/test";

export class MyUtilityPO {
    readonly page: Page
    readonly myAccountLink: Locator
    readonly myUtilityLink: Locator
    readonly premiumLink: Locator

    constructor(page: Page) {
        this.page = page
        this.myAccountLink = page.locator("//ul[@class='Navbar_navList__17ESt']/li//a[text()='My Account']")
        this.myUtilityLink = page.locator("//ul[@class='Navbar_resourcesSubmenu__3p8k2']//a[contains(text(),'My Utilities')]")
        this.premiumLink = page.locator("//a[text()=' Premium']")
    }
    /**
     * Hover to the my account link
     */
    async hoverToTheMyAccountLink() {
        await this.myAccountLink.hover()
        await this.page.waitForTimeout(2000)
    }
    /**
     * Click on my account link
     */
    async clickOnMyAccountLink() {
        await this.myAccountLink.click()
        await this.page.waitForTimeout(3000)
    }
    /**
     * Click on the my utility button
     */
    async clickOnMyUtilityLink() {
        await this.myUtilityLink.click()
        await this.page.waitForTimeout(5000)
    }
    /**
     * Get header text
     * @returns Header Text
     */
    async getHeaderText() {
        return await this.page.$eval('main > div:nth-child(3) h1', (el) => el.textContent.trim())
    }
}
