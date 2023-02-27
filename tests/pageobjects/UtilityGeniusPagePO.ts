import { Locator, Page } from "@playwright/test";

export class UtilityGeniusPagePO {
  readonly page: Page;
  readonly utilityPage: Locator;
  readonly startNowLink: Locator;
  readonly letsGoLink: Locator;
  readonly selectState: Locator;

  constructor(page: Page) {
    this.utilityPage = page.locator("text='Why UtilityGenius?' >> nth=0");
    this.startNowLink = page.locator("text='Start now'");
    this.letsGoLink = page.locator(`text="Let's go!" >> nth=0`);
    this.selectState = page.locator(
      "//div[@class='css-kaqmzc-indicatorContainer']"
    );
  }
  /**
   * Click on the utility genius link
   */
  async clickOnUtilityGeniusLink() {
    await this.utilityPage.click();
  }
  /**
   * Click on the start now button
   */
  async clickOnStartNowButton() {
    await this.startNowLink.click();
  }
  /**
   * Click on the lets go button
   */
  async clickOnLetsGoButton() {
    await this.letsGoLink.click();
  }
}
