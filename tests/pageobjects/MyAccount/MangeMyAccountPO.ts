import { expect, Locator, Page } from "@playwright/test";

export class ManageMyAccountPO {
    readonly page: Page
    readonly manageMyAccountLink: Locator
    readonly userName: Locator
    readonly logoutLink: Locator
    readonly upgradeAccountLink: Locator

    constructor(page: Page) {
        this.page = page
        this.manageMyAccountLink = page.locator("//ul[@class='Navbar_resourcesSubmenu__3p8k2']//a[contains(text(),'Manage My Account')]")
        this.userName = page.locator("p > strong:nth-child(1)")
        this.logoutLink = page.locator("//a[text()='Logout']")
        this.upgradeAccountLink = page.locator("//ul[@class='Navbar_navList__17ESt']/li//a[text()='Upgrade My Account']")
    }
    /**
     * Click on manage my account link
     */
    async clickOnManageMyAccountLink() {
        await this.manageMyAccountLink.click()
        await this.page.waitForTimeout(4000)
    }
    /**
     * Get username
     * @returns User name
     */
    async getUserName() {
        return await this.page.$eval("p > strong:nth-child(1)", (el) => el.textContent.trim())
    }
    /**
     * Verify address and order link is displayed
     */
    async verifyOrderAndAddressLinkIsDisplayed() {
        var orderLinkLocator = await this.page.locator("//a[text()='Orders']")
        await expect(orderLinkLocator).toBeVisible()

        var addressLocator = await this.page.locator("//a[text()='Addresses']")
        await expect(addressLocator).toBeVisible()
    }
    /**
     * Click on the logout link button
     */
    async clickOnLogoutLink() {
        await this.logoutLink.click()
        await this.page.waitForTimeout(4000)
    }
    /**
     * Verify signin link is displayed
     */
    async verifySignInLinkIsDisplayed() {
        const signInLink = await this.page.locator("#top-menu > li:nth-child(5) a");
        expect(signInLink).toBeVisible()
    }
    /**
     * Click on upgrade account link
     */
    async clickOnUpgradeMyAccountLink() {
        await this.upgradeAccountLink.click()
        await this.page.waitForTimeout(4000)
    }
}