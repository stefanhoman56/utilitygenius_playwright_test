import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { PricingPO } from './pageobjects/PricingPO'

// Page Data
import { pricingPageData } from './pagedata/PageData'

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

    test(`Verify the pricing page functionality`, async ({ page }) => {
        const Pricing = new PricingPO(page)
        // Step 1: Click on the pricing page link
        await Pricing.clickOnThePricingLink()

        // Step 2: Verify pricing page and verify
        await expect(page.url()).toEqual("https://utilitygenius.com/pricing/")
        var headerText = await Pricing.getHeaderTextOfPricingPage();
        await expect(headerText).toEqual(pricingPageData.headerText)

        // Step 3: Click on the 'Get Started' button of the free forever plan and verify 
        await Pricing.clickOnGetStartedButton()
        await expect(page.url()).toEqual("https://app.utilitygenius.com/")

        // Step 4: Click on the 'Create your free account' button of the starter plan and verify
        await Pricing.clickOnThePricingLink()
        await Pricing.clickOnCreateFreeAccountButton()
        await expect(page.url()).toEqual("https://app.utilitygenius.com/")

        // Step 5: Click on the 'Buy now' button of the pro plan and verify 
        await Pricing.clickOnThePricingLink()
        await Pricing.clickOnBuyNowButton()
        await expect(page.url()).toEqual("https://utilitygenius.com/cart/")

    })
})