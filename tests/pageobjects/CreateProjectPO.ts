import { Page, Locator, expect } from "@playwright/test";

export default class CreateProjectPO {
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

  readonly roomEditForm: string;
  readonly roomNameInput: Locator;
  readonly existingCatgSelect: Locator;
  readonly existingQtyInput: Locator;
  readonly existingFixtureSelect: Locator;
  readonly fixtureInput: Locator;
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
    this.addLineBtn = page.locator('text="Add Line"');
    this.saveLineBtn = page.locator('text="Save Line"');
  }

  /*
  = Create New Project
  */
  async createNewProject() {
    await this.projectNameInput.fill('Project1');

    await this.manufacturerSelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);
    
    await this.maintenanceCostInput.fill('100');

    await this.buildingNameSelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(this.intervalTime);
  
    await this.zipInput.fill("15206");

    await this.page.waitForTimeout(this.intervalTime);

    await this.utilitySelect.click();
    await this.page.waitForTimeout(this.intervalTime);
    await this.page.keyboard.press('Enter');



    await this.writeRoomFields();


    await this.saveProjectBtn.click();
  }

  async writeRoomFields() {
    await this.roomNameInput.fill('Room1');
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

  }
}
