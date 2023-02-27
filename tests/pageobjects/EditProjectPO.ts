import { Page, Locator, expect } from "@playwright/test";

export default class EditProjectPO {
  readonly page: Page;
  readonly intervalTime: number;

  readonly roomEditForm: string;
  readonly existingCatgSelect: Locator;
  readonly existingQtyInput: Locator;
  readonly existingFixtureSelect: Locator;
  readonly proposedCategorySelect: Locator;
  readonly proposedProductSelect: Locator;
  readonly proposedQtyInput: Locator;
  readonly equipCostInput: Locator;
  readonly laborCostInput: Locator;
  readonly otherCostInput: Locator;

  readonly duplicateRoomBtn: Locator;
  readonly addRoomBtn: Locator;
  readonly addLineBtn: Locator;
  readonly saveLineBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.intervalTime = 10000;
    
    this.roomEditForm = '.Room_wrap__jGPYI:last-child';
    this.existingCatgSelect = page.locator(this.roomEditForm + ' .LineEdit_existing___iqu1 .LineEdit_productGroup__wBSwy div:first-child .css-fyq6mk-container');
    this.existingFixtureSelect = page.locator(this.roomEditForm + ' .LineEdit_existing___iqu1 .LineEdit_productGroup__wBSwy > div:nth-child(2) .css-fyq6mk-container');
    this.existingQtyInput = page.locator(this.roomEditForm + ' input[name="existing_quantity"]');
    this.proposedCategorySelect = page.locator(this.roomEditForm + ' .LineEdit_proposed__0_R_v .LineEdit_productGroup__wBSwy > div:first-child .css-fyq6mk-container');
    this.proposedProductSelect = page.locator(this.roomEditForm + ' .LineEdit_proposed__0_R_v .LineEdit_productGroup__wBSwy > div:nth-child(2) .css-fyq6mk-container');
    this.proposedQtyInput = page.locator(this.roomEditForm + ' input[name="proposed_quantity"]');
    this.equipCostInput = page.locator(this.roomEditForm + ' input[name="equipment_cost"]');
    this.laborCostInput = page.locator(this.roomEditForm + ' input[name="labor_cost"]');
    this.otherCostInput = page.locator(this.roomEditForm + ' input[name="other_cost"]');

    this.duplicateRoomBtn = page.locator('text="Duplicate Room"');
    this.addRoomBtn = page.locator('text="Add Room"');
    this.addLineBtn = page.locator(this.roomEditForm + ' button:has-text("Add Line")');
    this.saveLineBtn = page.locator('text="Save Line"');
  }

  async duplicateRoom() {
    await this.duplicateRoomBtn.click();
    await this.page.waitForSelector('.Room_wrap__jGPYI:nth-child(2)');
  }

  async addRoom() {
    await this.addRoomBtn.click();
    await this.page.waitForSelector('.Room_wrap__jGPYI:nth-child(3)');
    await this.writeLineFields();
  }

  async addLine() {
    await this.addLineBtn.click();
    await this.writeLineFields();
  }

  async writeLineFields() {
    await this.existingCatgSelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);

    await this.existingFixtureSelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.existingQtyInput.fill('1');

    await this.proposedCategorySelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);

    await this.proposedProductSelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.proposedQtyInput.fill('1');
    await this.equipCostInput.fill('100');
    await this.laborCostInput.fill('20');
    await this.otherCostInput.fill('10');

    await this.saveLineBtn.click();

    await this.page.waitForTimeout(this.intervalTime);
  }
}
