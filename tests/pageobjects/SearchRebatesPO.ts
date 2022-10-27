import { expect, Locator, Page } from "@playwright/test";

export class SearchRebatesPO {
    readonly page: Page;
    readonly searchRebatesLink: Locator
    readonly headerText: Locator
    readonly selectStateDropDown: Locator
    readonly selectState: Locator
    readonly searchButton: Locator
    readonly searchUtility: Locator
    readonly countryOption: Locator
    readonly allUtilityButton: Locator
    readonly selectStateInput : Locator
    readonly pecoEnergyLink : Locator;
    readonly lightingWidget : Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchRebatesLink = page.locator("//ul[@class='Navbar_navList__17ESt']/li//a[text()='Search Rebates']")
        this.headerText = page.locator("div.Home_headingWrap__3H25g > h1")
        this.selectStateDropDown = page.locator("//div[text()='Select State ...']")
        this.selectState = page.locator("#react-select-2-option-0-5")
        this.searchButton = page.locator("input[placeholder='Search ...']")
        this.searchUtility = page.locator("//span[text()='All Results']/parent::div//div")
        this.countryOption = page.locator("//span[text()='Canada']")
        this.allUtilityButton = page.locator("span button")
        this.selectStateInput = page.locator("#react-select-2-input")
        this.pecoEnergyLink = page.locator("//h3[text()='PECO Energy Co']")
        this.lightingWidget = page.locator("//h3[text()='Lighting']");
    }
    /**
     * Click on the Search rebates button
     */
    async clickOnSearchRebatesButton() {
        this.searchRebatesLink.click()
        await this.page.waitForTimeout(2000)
    }
    /**
     * Get Header text
     * @returns Header Text
     */
    async getHeaderText() {
        return await this.page.$eval('div.Home_headingWrap__3H25g > h1', (el) => el.textContent.trim())
    }
    /**
     * Click on the select state drop down #
     */
     async clickOnSelectStateDropDownAndType() {
        await this.selectStateDropDown.click()
        await this.selectStateInput.type("Pennsylvania");
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);

    }
    /**
     * Click on the peco energy link #
     */
    async clickOnPecoEnergy() {
        await this.pecoEnergyLink.click();
        await this.page.waitForTimeout(2000);

    }
    /**
     * Click on the peco lighting widget #
     */
    async clickOnLightingWidget() {
        await this.lightingWidget.click();
        await this.page.waitForTimeout(2000);

    }
    /**
     * Click on the select state drop down and Select state
     */
    async clickOnSelectStateDropDownAndSelectState() {
        await this.selectStateDropDown.click()
        await this.page.waitForTimeout(2000)
        await this.selectState.click({ force: true })
    }
    /**
     * Verify that user navigated to the selected state location
     */
    async verifyUserNavigatedToTheSelectedSTateLocation() {
        await expect(this.page.url()).toEqual("https://app.utilitygenius.com/location/california")
    }

    /**
     * Click on the search button and verify utility
     */
    async clickOnSearchButtonAndSearchUtility(utlity) {
        await this.page.waitForTimeout(3000)
        await this.searchButton.type(utlity)
        await this.searchUtility.click()
    }
    /**
     * Get header text of utility page
     * @returns Header Text
     */
    async getHeaderTextOfUtilityPage() {
        await this.page.waitForTimeout(3000)
        return await this.page.$eval("h1", (el) => el.textContent.trim())
    }
    /**
     * Click on the country option
     */
    async clickOnTheCountryOption() {
        await this.countryOption.click()
    }
    /**
     * Click on the selecct dropdown button
     */
    async clickOnStateDropDownButton() {
        await this.page.waitForTimeout(2000)
        await this.selectStateDropDown.click()
    }
    /**
     * Get header text of heading
     * @returns Header Text
     */
    async getHeaderTextOfCountryHeading() {
        return await this.page.$eval("#react-select-2-group-0-heading", (el) => el.textContent.trim())
    }
    /**
     * Click on the all utility button
     */
    async clickOnAllUtilityButton() {
        await this.allUtilityButton.click()
        await this.page.waitForTimeout(6000)
    }
    /**
     * Get text of all utility page
     * @returns Header Text
     */
    async getHeaderTextOfAllUtilityPage() {
        return await this.page.$eval("h1", (el) => el.textContent.trim())
    }

}