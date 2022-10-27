// Locators
import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import { SearchRebatesPO } from './pageobjects/SearchRebatesPO'

// Page Data
import { searchRebatesPageData } from '../tests/pagedata/PageData'
import { allUtilityPageData } from '../tests/pagedata/PageData'

test.describe(`Verify Login Functionality`, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`/`)
        const Login = new LoginPO(page);

        // Step 1: User login with valid credentials
        await Login.enterLoginCredentialsAndClickOnLoginButton();

        // Step 2: Verify home page URl
        await expect(page.url()).toEqual("https://app.utilitygenius.com/")
        await Login.verifyImageLogoIsDisplayed()

    })
    test(`Verify search rebates page`, async ({ page }) => {
        // Step 1: Click on the search rebates link 

        const RebatesPage = new SearchRebatesPO(page)
        RebatesPage.clickOnSearchRebatesButton();

        // Step 2: Verify search rebates page
        await page.waitForTimeout(3000)
        await expect(page.url()).toEqual("https://app.utilitygenius.com/")
        const headerText = await RebatesPage.getHeaderText()
        await expect(headerText).toEqual(searchRebatesPageData.headerText)

        // Step3: Click on the select state dropdown and select state
        await RebatesPage.clickOnSelectStateDropDownAndSelectState()

        //Step 4: Verify selected state location is displayed
        await RebatesPage.verifyUserNavigatedToTheSelectedSTateLocation()
        await page.goBack()

        // Step 5: Click on the search button and search the utility
        await RebatesPage.clickOnSearchButtonAndSearchUtility(searchRebatesPageData.utility)

        // Step 6: Verify utility page
        const headerTextOfUtilityPage = await RebatesPage.getHeaderTextOfUtilityPage()
        await expect(headerTextOfUtilityPage).toContain(searchRebatesPageData.utility)
        await page.goBack()

        // Step 7: Change the country and verify countrt is changed
        await RebatesPage.clickOnTheCountryOption()
        await RebatesPage.clickOnStateDropDownButton()

        const headerTextOfCountry = await RebatesPage.getHeaderTextOfCountryHeading()
        await expect(headerTextOfCountry).toContain("Canada")

        // Step 8: Click on thr all utility button
        await RebatesPage.clickOnAllUtilityButton()
        await expect(page.url()).toEqual("https://app.utilitygenius.com/utilities")
        const headerTextOfAllUtilityPage = await RebatesPage.getHeaderTextOfAllUtilityPage()
        expect(headerTextOfAllUtilityPage).toContain(allUtilityPageData.headerText)

    })
})