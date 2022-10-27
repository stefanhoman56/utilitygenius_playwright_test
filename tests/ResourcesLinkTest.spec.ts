import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { ResourcesPO } from "./pageobjects/ResourcePage/ResourcesPO";

// Page Data
import { ResourceLinkData } from './pagedata/PageData'

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

    test(`Verify the Report page functionality of Resources page`, async ({ page }) => {

        // Step 1: Select the Report option of the Report link and verify
        const Resource = new ResourcesPO(page)
        await Resource.hoverToTheResourceLink()
        await Resource.clickOnTheReportLink()
        await expect(page.url()).toEqual("https://utilitygenius.com/product-category/reports/")
        var headerText = await Resource.getHeaderText()
        await expect(headerText).toEqual(ResourceLinkData.headerText)
    })
})