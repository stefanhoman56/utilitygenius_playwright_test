import { test, expect } from "@playwright/test";
import { SearchRebatesPO } from './pageobjects/SearchRebatesPO';

test(`Verify widget clickability`, async ({page}) => {
  //Step 1: Go to home page
  await page.goto(`https://app.utilitygenius.com/`);
  const RebatesPage = new SearchRebatesPO(page);

  // Step 2: Select pennsylvania
  await RebatesPage.clickOnSelectStateDropDownAndType();
  await expect(page.url()).toEqual("https://app.utilitygenius.com/location/pennsylvania");

  // Step 3: Click on peco energy link
  await RebatesPage.clickOnPecoEnergy();
  await expect(page.url()).toEqual("https://app.utilitygenius.com/utilities/peco");

  // Step 4: Click on lighting widget
  await RebatesPage.clickOnLightingWidget();

  // Step 5: Verifying that green widgets are clickable and redirects to new tab
  const applyWidget = await page.locator(".Utility_applyNowButton__1jjoW");
  const applyWidgetLink = await page.locator((".Utility_applyNowButton__1jjoW > a[target='_blank']"));

  await expect(applyWidget).toBeEnabled();
  await expect(applyWidgetLink).toBeEnabled();
  await page.waitForTimeout(2000);
})