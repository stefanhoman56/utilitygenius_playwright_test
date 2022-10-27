// Page Objet
import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { ResourcesPO } from "./pageobjects/ResourcePage/ResourcesPO";
import { FeedBackPO } from "./pageobjects/ResourcePage/FeedBackPO";

// Page Data
import { FeedBackPageData } from './pagedata/PageData'

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

    test(`Verify the feedback page functionality`, async ({ page }) => {

        const Resource = new ResourcesPO(page)
        const Feedback = new FeedBackPO(page)

        // Step 1: Select the Feedback option of the Reports link and verify
        await Resource.hoverToTheResourceLink()
        await Feedback.clickOnFeedBackLink()
        var headerText = await Feedback.getHeaderText()
        expect(page.url()).toEqual("https://utilitygenius.com/feedback/")
        expect(headerText).toEqual(FeedBackPageData.headerText)

    })
})