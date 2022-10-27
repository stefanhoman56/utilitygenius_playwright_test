import { Locator, Page } from "@playwright/test";

export class ResourcesPO {
    readonly page: Page
    readonly resourcesLink: Locator
    readonly reportsLink: Locator
    readonly headerText: Locator
    readonly helpCenterLink: Locator
    readonly userGuideLink: Locator
    readonly feedBackLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.resourcesLink = page.locator("//ul[@class='Navbar_navList__17ESt']/li//a[text()='Resources']")
        this.reportsLink = page.locator("//ul[@class='Navbar_resourcesSubmenu__3p8k2']//a[contains(text(),'Reports')]")
        this.helpCenterLink = page.locator("//ul[@class='Navbar_resourcesSubmenu__3p8k2']//a[contains(text(),'Help Center')]")
    }
    /**
     * Hover mouse to the resources link
     */
    async hoverToTheResourceLink() {
        await this.resourcesLink.hover()
        await this.page.waitForTimeout(2000)
    }
    /**
     * Click on the reports link
     */
    async clickOnTheReportLink() {
        await this.reportsLink.click({ force: true })
        await this.page.waitForTimeout(4000)

    }
    /**
     * Get header text of the Reports page
     * @returns Header Text
     */
    async getHeaderText() {
        return await this.page.$eval(
            "header h1",
            (el) => el.textContent.trim()
        );
    }
    /**
     * Click on the help center link of the reports link dropdown
     */
    async clickOnTheHelpCenterLink() {
        await this.helpCenterLink.click({ force: true })
        await this.page.waitForTimeout(3000)
    }
    /**
     * Get header text of the help center page
     * @returns Header Text
     */
    async getHeaderTextOfHelpCenterPage() {
        await this.page.waitForTimeout(3000)
        return await this.page.$eval("h1", (el) => el.textContent.trim());
    }
}