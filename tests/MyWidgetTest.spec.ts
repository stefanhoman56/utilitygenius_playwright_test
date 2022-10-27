// Page Objet
import { test, expect } from "@playwright/test";
import { LoginPO } from "./pageobjects/LoginPO";
import { MyUtilityPO } from "./pageobjects/MyAccount/MyUtilityPO";
import { MyWidgetPO } from "./pageobjects/MyAccount/MyWidgetPO";

// Page Data
import { myWidgetPageData } from './pagedata/PageData'

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
    test(`Verify the My widget page functionality`, async ({ page }) => {

        const MyUtility = new MyUtilityPO(page)
        const MyWidget = new MyWidgetPO(page)

        // Step 1: Select the My widget option of the Reports link and verify
        await MyUtility.hoverToTheMyAccountLink()
        await MyWidget.clickOnMyWidgetLink()
 
        expect(page.url()).toEqual("https://app.utilitygenius.com/my-widgets")

        // Step 2: Create new widgets
        await MyWidget.clickOnNewWidetButton()
        await MyWidget.createNewWidget(myWidgetPageData.widgetName, myWidgetPageData.widgetLocation)
        await MyWidget.clickOnCloseButtonOfPopUp()
        const widgetName = await MyWidget.getWidgetName()
        expect(widgetName).toEqual(myWidgetPageData.widgetName)

    })
})