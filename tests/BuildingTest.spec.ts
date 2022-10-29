import { test, expect } from "@playwright/test";
import { LoginPO } from "../tests/pageobjects/LoginPO";
import BuildingPO from "./pageobjects/BuildingPO";

test.describe(`Verify Login Functionality`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`https://app.utilitygenius.com/`);
    await page.locator(`role=link[name="Sign In"]`).click();
    // await page.goto(`https://buildings-staging.utilitygenius.com/`);

    const Login = new LoginPO(page);

    // Step 1: User login with valid credentials
    await Login.enterLoginCredentialsAndClickOnLoginButton();

    // Step 2: Verify home page URl
    await expect(page.url()).toEqual(
      "https://app.utilitygenius.com/"
      // "https://buildings-staging.utilitygenius.com/"
    );
    //await Login.verifyImageLogoIsDisplayed();
  });

  test.only(`Verify that user successfully login into the website`, async ({
    page,
  }) => {
    const Building = new BuildingPO(page);
    //Step 1 : Click create new building button
    await Building.clickCreateNewBuildingBtn();

    //Step 2 : Create new building
    const newBuilding = await Building.createNewBuilding();

    //Step 2-2: Go to list page
    await page.goto(`https://buildings.utilitygenius.com/`);

    //Step 3 : Click Edit button
    await Building.clickEditBuildingBtn();

    //Step 4 : Edit building info
    const updatedBuilding = await Building.editAndUpdateBuilding();

    //Step : Validate edited data
    await Building.validatedEditedBuilding(updatedBuilding);

    //Step 5 : Click list view button
    await Building.clickListViewBtn();

    //Step : Click list view edit button
    await Building.clickListViewEditBuildingBtn();

    //Step 6 : Edit building info
    const updatedBuilding2 = await Building.editAndUpdateBuilding();

    //Step : Validate edited data
    await Building.validatedEditedBuildingInListMode(updatedBuilding2);

    //Step : Click filter button
    await Building.clickFilterBtn();

    //Step : Filter and Validate
    await Building.filterAndValidate(newBuilding);
  });
});
