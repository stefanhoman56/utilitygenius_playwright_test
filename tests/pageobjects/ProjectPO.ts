import { Page, Locator, expect } from "@playwright/test";

export default class ProjectPO {
  readonly page: Page;
  readonly intervalTime: number;
  
  readonly createProjectForm: string;
  readonly projectNameInput: Locator;
  readonly manufacturerSelect: Locator;
  readonly maintenanceCostInput: Locator;
  readonly buildingNameSelect: Locator;
  readonly zipInput: Locator;
  readonly utilitySelect: Locator;
  readonly saveProjectBtn: Locator;

  public roomEditForm: string;
  readonly roomNameInput: Locator;
  public existingCatgSelect: Locator;
  public existingQtyInput: Locator;
  public existingFixtureSelect: Locator;
  readonly fixtureInput: Locator;
  public proposedCategorySelect: Locator;
  public proposedProductSelect: Locator;
  public proposedQtyInput: Locator;
  public equipCostInput: Locator;
  public laborCostInput: Locator;
  public otherCostInput: Locator;

  readonly duplicateRoomBtn: Locator;
  readonly addRoomBtn: Locator;
  public addLineBtn: Locator;
  readonly saveLineBtn: Locator;

  public roomName: string;
  public runMode: string;

  constructor(page: Page) {
    this.page = page;
    this.intervalTime = 10000;

    this.runMode = "create"

    this.createProjectForm = '.ProjectForm_form__qL9Q4';
    this.projectNameInput = page.locator(this.createProjectForm + ' input[name="name"]');
    this.manufacturerSelect = page.locator(this.createProjectForm + ' .ProjectForm_inputGroup__4KcFj .css-fyq6mk-container');
    this.maintenanceCostInput = page.locator(this.createProjectForm + ' input[name="maintenance_cost_override"]');
    this.buildingNameSelect = page.locator(this.createProjectForm + ' > div:nth-child(3) .css-fyq6mk-container');
    this.zipInput = page.locator(this.createProjectForm + ' input[name="zip"]');
    this.utilitySelect = page.locator(this.createProjectForm + ' .ProjectLocation_formGroup__PnvGW div:nth-child(3) .css-fyq6mk-container');
    
    this.roomEditForm = '.ProjectForm_roomsWrap__HUnQ0';
    this.roomNameInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.name"]');
    this.existingCatgSelect = page.locator(this.roomEditForm + ' .Line_existing__s_qog .Line_productGroup__lj90z div:first-child .css-fyq6mk-container');
    this.existingQtyInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.project_items.0.existing_quantity"]');
    this.existingFixtureSelect = page.locator(this.roomEditForm + ' .Line_existing__s_qog .Line_productGroup__lj90z > div:nth-child(2) .css-fyq6mk-container');
    this.fixtureInput = page.locator(this.roomEditForm + ' .Line_existing__s_qog .Line_productGroup__lj90z div:nth-child(2) .css-fyq6mk-container input');
    this.proposedCategorySelect = page.locator(this.roomEditForm + ' .Line_proposed__iD6My .Line_productGroup__lj90z > div:first-child .css-fyq6mk-container');
    this.proposedProductSelect = page.locator(this.roomEditForm + ' .Line_proposed__iD6My .Line_productGroup__lj90z > div:nth-child(2) .css-fyq6mk-container');
    this.proposedQtyInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.project_items.0.proposed_quantity"]');
    this.equipCostInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.project_items.0.equipment_cost"]');
    this.laborCostInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.project_items.0.labor_cost"]');
    this.otherCostInput = page.locator(this.roomEditForm + ' input[name="project_rooms.0.project_items.0.other_cost"]');

    this.saveProjectBtn = page.locator('button:has-text("Save Project")');

    this.duplicateRoomBtn = page.locator('text="Duplicate Room"');
    this.addRoomBtn = page.locator('text="Add Room"');
    this.addLineBtn = page.locator(this.roomEditForm + ' button:has-text("Add Line")');
    this.saveLineBtn = page.locator('text="Save Line"');
  }

  generateRandomString(): string {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 6));
    return randomNumber.toString().padStart(6, "0");
  }

  /*
  = Create New Project
  */
  async createNewProject() {
    this.roomName = 'Project' + this.generateRandomString();

    await this.projectNameInput.fill(this.roomName);

    await this.manufacturerSelect.click();
    await this.page.keyboard.type('Carolina');
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);
    
    await this.maintenanceCostInput.fill('100');

    await this.buildingNameSelect.click();
    await this.page.keyboard.type('Building9');
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);
  
    await this.zipInput.fill("15206");

    await this.page.waitForTimeout(this.intervalTime);

    await this.utilitySelect.click();
    await this.page.keyboard.type('West');
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');



    await this.writeRoomFields();


    await this.saveProjectBtn.click();
  }

  async writeRoomFields() {
    await this.roomNameInput.fill('MyRoom');
    await this.writeLineFields();
  }

  async writeLineFields() {
    await this.existingCatgSelect.click();
    await this.page.keyboard.type('CFL'); 
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);

    await this.existingFixtureSelect.click();
    await this.page.waitForTimeout(this.intervalTime); // Lamp
    await this.page.keyboard.press('Enter');

    await this.existingQtyInput.fill('1');

    await this.proposedCategorySelect.click();
    await this.page.keyboard.type('2x2');
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);

    await this.proposedProductSelect.click();
    await this.page.keyboard.type('CPS');
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.proposedQtyInput.fill('1');
    await this.equipCostInput.fill('100');
    await this.laborCostInput.fill('20');
    await this.otherCostInput.fill('10');

    if (this.runMode == "edit") {
      await this.saveLineBtn.click();
  
      await this.page.waitForTimeout(this.intervalTime);
    }
  }

  setEditMode() {
    this.runMode = "edit";

    this.roomEditForm = '.Room_wrap__jGPYI:last-child';
    this.existingCatgSelect = this.page.locator(this.roomEditForm + ' .LineEdit_existing___iqu1 .LineEdit_productGroup__wBSwy div:first-child .css-fyq6mk-container');
    this.existingFixtureSelect = this.page.locator(this.roomEditForm + ' .LineEdit_existing___iqu1 .LineEdit_productGroup__wBSwy > div:nth-child(2) .css-fyq6mk-container');
    this.existingQtyInput = this.page.locator(this.roomEditForm + ' input[name="existing_quantity"]');
    this.proposedCategorySelect = this.page.locator(this.roomEditForm + ' .LineEdit_proposed__0_R_v .LineEdit_productGroup__wBSwy > div:first-child .css-fyq6mk-container');
    this.proposedProductSelect = this.page.locator(this.roomEditForm + ' .LineEdit_proposed__0_R_v .LineEdit_productGroup__wBSwy > div:nth-child(2) .css-fyq6mk-container');
    this.proposedQtyInput = this.page.locator(this.roomEditForm + ' input[name="proposed_quantity"]');
    this.equipCostInput = this.page.locator(this.roomEditForm + ' input[name="equipment_cost"]');
    this.laborCostInput = this.page.locator(this.roomEditForm + ' input[name="labor_cost"]');
    this.otherCostInput = this.page.locator(this.roomEditForm + ' input[name="other_cost"]');
    this.addLineBtn = this.page.locator(this.roomEditForm + ' button:has-text("Add Line")');
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

  async checkRoom() {
    await this.page.waitForSelector('.ProjectHeader_header__IZh7h')

    await expect(this.page.locator('.ProjectHeader_header__IZh7h')).toHaveText(this.roomName);
    await expect(this.page.locator('.ProjectAddress_showAddress__lKxa9 > p:nth-child(2)')).toContainText('15206')
    await expect(this.page.locator('.ProjectAddress_showAddress__lKxa9 > p:nth-child(4)')).toContainText('West')
    // await expect(this.page.locator('.ProjectAddress_showAddress__lKxa9 > p:nth-child(4)')).toContainText('Duq')
    await expect(this.page.locator('.ProjectManufacturer_manufacturer___zSBA > p')).toContainText('Carolina')

    await expect(this.page.locator('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(1) .Room_roomName__5ZBHH > h2')).toContainText('MyRoom')
    await expect(this.page.locator('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(2) .Room_roomName__5ZBHH > h2')).toContainText('MyRoom')
    await expect(this.page.locator('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(3) .Room_roomName__5ZBHH > h2')).toContainText('Room 3')

    await this.checkLineInfo('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(1) .Line_wrap__aHsqF:nth-child(1)')
    await this.checkLineInfo('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(2) .Line_wrap__aHsqF:nth-child(1)')
    await this.checkLineInfo('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(3) .Line_wrap__aHsqF:nth-child(1)')
    await this.checkLineInfo('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(3) .Line_wrap__aHsqF:nth-child(2)')

    await this.page.fill('.SearchRooms_search__JKu0_input', 'MyRoom')
    await this.page.waitForTimeout(1000)
    await expect(this.page.locator('.Project_roomsWrap__LmD0f > .Room_wrap__jGPYI:nth-child(1) .Room_roomName__5ZBHH > h2')).toContainText('MyRoom')
  }

  async checkLineInfo(lineSelector: string) {
    const selector = lineSelector + ' .Line_details__cAJMf '
    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(2) p:nth-child(1) span')).toContainText('Lamp')
    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(2) p:nth-child(3) span')).toHaveText('1')

    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(4) p:nth-child(1) span')).toContainText('CPS')
    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(4) p:nth-child(3) span')).toHaveText('1')

    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(6) p:nth-child(1) span')).toHaveText('$100')
    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(6) p:nth-child(2) span')).toHaveText('$20')
    await expect(this.page.locator(selector + '.Line_row__FFww8:nth-child(6) p:nth-child(3) span')).toHaveText('$10')
  }
}
