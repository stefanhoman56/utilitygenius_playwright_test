// Page Objet
import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { MyUtilityPO } from "./pageobjects/MyAccount/MyUtilityPO";
import { ManageMyAccountPO } from './pageobjects/MyAccount/MangeMyAccountPO'
// Page Data


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
        const ManageMyAccount = new ManageMyAccountPO(page)

        // Step 1: Select the My widget option of the Reports link and verify
        await MyUtility.hoverToTheMyAccountLink()
        await ManageMyAccount.clickOnManageMyAccountLink()

        expect(page.url()).toEqual("https://utilitygenius.com/my-account/")
        const userName = await ManageMyAccount.getUserName()
        expect(userName).toEqual("testdata")
        await ManageMyAccount.verifyOrderAndAddressLinkIsDisplayed()


        //Step 2: Click on the logout button and verify
        await ManageMyAccount.clickOnLogoutLink()
        await ManageMyAccount.verifySignInLinkIsDisplayed()
    })
    test(`Verify the Upgrade My Accouont functionality`, async ({ page }) => {
        // Step1: Click on the upgarade my account button and verify
        const ManageMyAccount = new ManageMyAccountPO(page)
        await ManageMyAccount.clickOnUpgradeMyAccountLink()
        expect(page.url()).toEqual("https://utilitygenius.com/pricing/")
    })

})