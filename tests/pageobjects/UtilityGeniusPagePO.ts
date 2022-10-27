import { Locator, Page } from "@playwright/test";

export class UtilityGeniusPagePO {
  readonly page: Page;
  readonly utilityPage: Locator;
  readonly startNowLink: Locator;
  readonly letsgoLink: Locator;
  readonly selectState: Locator;

  constructor(page: Page) {
    this.utilityPage = page.locator(
      "//ul[@class='Navbar_navList__17ESt']/li//a[text()='Why UtilityGenius?']"
    );
    this.startNowLink = page.locator(
      "//a[@class='et_pb_button et_pb_button_8 et_hover_enabled et_pb_bg_layout_dark']"
    );
    this.letsgoLink = page.locator(
      "//a[@class='et_pb_button et_pb_button_9 et_hover_enabled et_pb_bg_layout_dark']"
    );
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
    await this.letsgoLink.click();
  }

}
