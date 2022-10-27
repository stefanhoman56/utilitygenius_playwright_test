// Page Objet
import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { ResourcesPO } from "./pageobjects/ResourcePage/ResourcesPO";
import { HelpCenterPO } from "./pageobjects/ResourcePage/HelpCenterPO";

// Page Data
import { HelpCenterPageData } from "./pagedata/PageData";

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

    test(`Verify the functionality of help center page`, async ({ page }) => {

        const Resource = new ResourcesPO(page)
        const HelpCenter = new HelpCenterPO(page)

        // Step 1: Select the Help center option of the Reports link and verify
        await Resource.hoverToTheResourceLink()
        await Resource.clickOnTheHelpCenterLink()
        var headerTextOfHelpCenterPage = await Resource.getHeaderTextOfHelpCenterPage()
        expect(headerTextOfHelpCenterPage).toEqual(HelpCenterPageData.headerText)

        // Step 2: Click on the see the guide button of user guide box and verify
        await HelpCenter.clickOntheSeeGuideButton()
        await expect(page.url()).toEqual("https://utilitygenius.com/user-guide/")
        await page.goBack()

        // Step 3: Click on the Give feedback button of the feedback box and verify
        await HelpCenter.clickOnTheGiveFeedBackButton()
        await expect(page.url()).toEqual("https://utilitygenius.com/feedback/")
        await page.goBack()

        // Step 4: Submit the feedback form and verify
        // await HelpCenter.enterFormDetails(HelpCenterPageData.email, HelpCenterPageData.subject, HelpCenterPageData.description)
        // var successMessage = await HelpCenter.getSuccessMessage()
        // await expect(successMessage).toEqual(HelpCenterPageData.successMessage)

    })
})