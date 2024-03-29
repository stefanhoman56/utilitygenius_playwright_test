import { Locator, Page } from "@playwright/test";

export class FeedBackPO {
  readonly page: Page;
  readonly feedBackLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.feedBackLink = page.locator("text='Feedback' >> nth=0");
  }
  /**
   * Click on the feedback link
   */
  async clickOnFeedBackLink() {
    await this.feedBackLink.click();
    await this.page.waitForTimeout(4000);
  }
  /**
   * Get header text
   * @returns Header Text
   */
  async getHeaderText() {
    return await this.page.$eval("h1", (el) => el.textContent.trim());
  }
}
