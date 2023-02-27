import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import ProjectPO from "./pageobjects/ProjectPO";

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

    const Project = new ProjectPO(page);
    await Project.createNewProject();

    await page.waitForNavigation();

    Project.setEditMode();

    await Project.duplicateRoom();

    await page.waitForTimeout(5000);

    await Project.addRoom();

    await Project.addLine();

    await page.goto('https://projects.utilitygenius.com/');

    await page.click(`.Home_tiles__k2_nZ > div > div > a > h2:has-text(${Project.roomName}) >> xpath=..`);
    
    // await page.goto('https://projects.utilitygenius.com/project/1c9d8195-aea0-4d7d-907d-948c37b20006')
    // const Project = new ProjectPO(page);
    // Project.roomName = 'Project57697239'

    await Project.checkRoom()
  });
});
