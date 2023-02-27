import { Locator, Page } from "@playwright/test";

export class MyWidgetPO {
  readonly page: Page;
  readonly myWidgetLink: Locator;
  readonly myAccountLink: Locator;
  readonly createNewWidgetButton: Locator;
  readonly widgetNickNameInput: Locator;
  readonly widgetLocationInput: Locator;
  readonly clickOnVisibleTechnology: Locator;
  readonly selectTechnology: Locator;
  readonly saveWidgetButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.locator("text='My Account' >> nth=0");
    this.myWidgetLink = page.locator("text='My Widgets' >> nth=0");
    this.createNewWidgetButton = page.locator(
      "//button[text()='Create New Widget']"
    );
    this.widgetNickNameInput = page.locator("input[placeholder='My Widget']");
    this.widgetLocationInput = page.locator(
      "input[placeholder='www.mywebsite.com/widget']"
    );
    this.clickOnVisibleTechnology = page.locator("#react-select-2-placeholder");
    this.selectTechnology = page.locator("#react-select-2-option-0");
    this.saveWidgetButton = page.locator("//button[text()='Save Widget']");
    this.closeButton = page.locator("button svg");
  }
  /**
   * Click on my widget link
   */
  async clickOnMyWidgetLink() {
    await this.myWidgetLink.click();
    await this.page.waitForTimeout(2000);
  }
  /**
   * Get header text of my widgets page
   * @returns Header Text
   */
  async getHeaderText() {
    await this.page.waitForTimeout(5000);
    return await this.page.$eval("h1", (el) => el.textContent.trim());
  }
  /**
   * Click on the new widget button
   */
  async clickOnNewWidetButton() {
    await this.page.waitForTimeout(2000);
    await this.createNewWidgetButton.click();
  }
  /**
   * Create New Widget
   */
  async createNewWidget(widgetName, widgetLocation) {
    await this.page.waitForTimeout(2000);
    await this.widgetNickNameInput.type(widgetName);
    await this.page.waitForTimeout(2000);
    await this.widgetLocationInput.type(widgetLocation);
    await this.page.waitForTimeout(2000);
    await this.clickOnVisibleTechnology.click({ force: true });
    await this.page.waitForTimeout(2000);
    await this.selectTechnology.click();
    await this.saveWidgetButton.click();
    await this.page.waitForTimeout(2000);
  }
  /**
   * Click on the close button
   */
  async clickOnCloseButtonOfPopUp() {
    await this.closeButton.click();
    await this.page.waitForTimeout(2000);
  }
  /**
   * Get widgets name
   * @returns Widgets name
   */
  async getWidgetName() {
    return await this.page.$eval(
      "tbody > tr:nth-child(1) >td:nth-child(2)",
      (el) => el.textContent.trim()
    );
  }
}
