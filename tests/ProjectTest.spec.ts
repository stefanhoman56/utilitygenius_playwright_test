import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import CreateProjectPO from "./pageobjects/CreateProjectPO";
import EditProjectPO from "./pageobjects/EditProjectPO";

test.describe(`Verify Login Functionality`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`https://utilitygenius.com/`);
    await page.locator(`role=link[name="Sign In"]`).click();

    const Login = new LoginPO(page);

    await Login.enterLoginCredentialsAndClickOnLoginButton();

    await page.waitForURL('https://app.utilitygenius.com/')

    // Step 2: Verify home page URl
    // await expect(page.url()).toEqual(
    //   "https://app.utilitygenius.com/"
    //   // "https://buildings-staging.utilitygenius.com/"
    // );
  });

  test.only(`Verify projects`, async ({
    page,
  }) => {
    await page.click('.Home_appDashWrap__TCIdt > div:nth-child(2) .AppDashTile_createWrap__f0F0T > a');

    const CreateProject = new CreateProjectPO(page);
    await CreateProject.createNewProject();

    await page.waitForNavigation();

    const EditProject = new EditProjectPO(page);

    await EditProject.duplicateRoom();

    await page.waitForTimeout(5000);

    await EditProject.addRoom();

    await EditProject.addLine();

    await page.goto('https://projects.utilitygenius.com/');

    await page.waitForTimeout(1000000);
  });
});
