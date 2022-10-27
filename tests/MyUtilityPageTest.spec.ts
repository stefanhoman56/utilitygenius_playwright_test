// Page Objet
import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { MyUtilityPO } from "./pageobjects/MyAccount/MyUtilityPO";

// Page Data
import { MyUtilityPageData } from './pagedata/PageData'

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
    test(`Verify the My Account page functionality`, async ({ page }) => {
        const MyUtility = new MyUtilityPO(page)

        // Step 1: Click on my account page and verify 
        await MyUtility.clickOnMyAccountLink()

        // Step 2: Verify My account page
        expect(page.url()).toEqual("https://utilitygenius.com/my-account/edit-account/")
    })

    test(`Verify the My Utility page functionality`, async ({ page }) => {

        const MyUtility = new MyUtilityPO(page)

        // Step 1: Select the My utility option of the Reports link and verify
        await MyUtility.hoverToTheMyAccountLink()
        await MyUtility.clickOnMyUtilityLink()

        var headerText = await MyUtility.getHeaderText()
        expect(page.url()).toEqual("https://app.utilitygenius.com/my-utilities")
        expect(headerText).toEqual(MyUtilityPageData.headerText)
    })
})