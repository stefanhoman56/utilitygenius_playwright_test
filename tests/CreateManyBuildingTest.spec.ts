import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import BuildingPO from "./pageobjects/BuildingPO";
import { newBuilding } from "./pagedata/PageData";

test.describe(`Verify Login Functionality`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`https://app.utilitygenius.com/`);
    await page.locator(`role=link[name="Sign In"]`).click();
    // await page.goto(`https://buildings-staging.utilitygenius.com/`);

    const Login = new LoginPO(page);

    // Step 1: User login with valid credentials
    await Login.enterLoginCredentialsAndClickOnLoginButton();

    // Step 2: Verify home page URl
    await expect(page.url()).toMatch(
      /https:\/\/app.utilitygenius.com[\/|\/#]/
      // "https://buildings-staging.utilitygenius.com/"
    );
    //await Login.verifyImageLogoIsDisplayed();
  });

  test.only(`Create 120 buildings`, async ({
    page,
  }) => {
    const backup = { ...newBuilding };
    for (let i = 1; i <= 120; i++) {
      const Building = new BuildingPO(page);
      //Step 1 : Click create new building button
      await page.waitForSelector('text="Don’t show me this again"', { timeout: 3000 })
        .then(async () => {
          await page.locator(`text="Don’t show me this again"`).click();
        })
        .catch (async (error) => {
        })
      await Building.clickCreateNewBuildingBtn();

      await new Promise(resolve => setTimeout(resolve, 2000));
  
      //Step 2 : Create new building
      newBuilding.name = backup.name + "_" + i;
      newBuilding.address1 = backup.address1 + i;
      newBuilding.address2 = backup.address2 + i;
      newBuilding.zipCode = (parseInt(backup.zipCode) + i).toString();
      await Building.createNewBuilding();

      //Step 2-2: Go to list page
      await page.goto(`https://app.utilitygenius.com/`);
    }
    
    for (const key in backup) {
      newBuilding[key] = backup[key];
    }
  });
});
