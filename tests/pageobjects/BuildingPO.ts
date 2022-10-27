import { Page, Locator, expect } from "@playwright/test";
import { currentTime, randBuildingType, randNumber } from "../../helpers/util";
import {
  buildingType,
  editBuilding,
  newBuilding,
  utility,
} from "../pagedata/PageData";

export default class BuildingPO {
  readonly page: Page;
  readonly createNewBuildingBtn: Locator;
  readonly buildingName: Locator;
  readonly buildingAddress: Locator;
  readonly buildingAddress2: Locator;
  readonly buildingCity: Locator;
  readonly buildingState: Locator;
  readonly buildingZipCode: Locator;
  readonly buildingType: Locator;
  readonly buildingSqFootage: Locator;
  readonly buildingUtility: Locator;
  readonly buildingRate: Locator;
  readonly buildingTags: Locator;
  readonly createBuildingBtn: Locator;
  readonly createBuildingSuccessMsg: Locator;
  readonly editBuildingBtn: Locator;
  readonly editBuildingTitle: Locator;
  readonly updateBuildingBtn: Locator;
  readonly editedBuildingTitle: Locator;
  readonly editedBuildingAddress: Locator;
  readonly updateBuildingSuccessMsg: Locator;
  readonly backBtn: Locator;
  readonly listViewBtn: Locator;
  readonly filterBtn: Locator;
  readonly listViewEditBtn: Locator;
  readonly filterDropdown: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewBuildingBtn = page.locator(
      // "div.Home_createBuildingTile__Gm4Tq >> nth=0"
      "div.MyBuildingsDash_createBuildingTile__A_60S"
    );
    this.buildingName = page.locator(`[placeholder="Building Name"]`);
    this.buildingAddress = page.locator(`[placeholder="Address"]`);
    this.buildingAddress2 = page.locator(`[placeholder="Address 2"]`);
    this.buildingCity = page.locator(`[placeholder="City"]`);
    this.buildingState = page.locator(`div.css-fyq6mk-container >> nth=0`);
    this.buildingZipCode = page.locator(`[placeholder="Zip Code"]`);
    this.buildingType = page.locator(`div.css-fyq6mk-container >> nth=1`);
    this.buildingSqFootage = page.locator(`[placeholder="Sq. Footage"]`);
    this.buildingUtility = page.locator(`div.css-xl1jui-control >> nth=2`);
    this.buildingRate = page.locator(`[placeholder="Rate KWH"]`);
    this.buildingTags = page.locator(`div.css-fyq6mk-container >> nth=3`);
    this.createBuildingBtn = page.locator('text="Create Building"');
    this.createBuildingSuccessMsg = page.locator(
      'text="New Building Created!"'
    );
    this.editBuildingBtn = page.locator(
      `div.BuildingTile_tileDropdownKebab__HWiJf >> nth=0`
    );
    this.editBuildingTitle = page.locator(
      "input.CreateEditForm_headerInput__FjriC >> nth=0"
    );
    this.updateBuildingBtn = page.locator("text='Update Building'");
    this.updateBuildingSuccessMsg = page.locator('text="Building Updated!"');
    this.editedBuildingTitle = page.locator(
      "h2.BuildingTile_tileTitle__k6Jjq >> nth=0"
    );
    this.editedBuildingAddress = page.locator("small >> nth=0");
    this.backBtn = page.locator("a.CreateEditForm_backButton__h5yU1 >> nth=0");
    this.listViewBtn = page.locator(
      "button.Home_toggleButton__EM5rM  >> nth=1"
    );
    this.filterBtn = page.locator("button.Home_toggleButton__EM5rM >> nth=2");
    this.listViewEditBtn = page.locator(`text="Edit" >> nth=0`);
    this.filterDropdown = page.locator("div.css-coa4j7-control >> nth=0");
    this.nextButton = page.locator('text="Next" >> nth=0');
  }

  /*
  = Create New Building
  */
  async createNewBuilding() {
    await this.buildingName.fill(newBuilding.name);
    await this.buildingAddress.fill(newBuilding.address1);
    await this.buildingAddress2.fill(newBuilding.address2);
    await this.buildingCity.fill(newBuilding.city);
    await this.buildingState.click();
    await this.page.locator(`text="${newBuilding.state}"`).click();
    await this.buildingZipCode.fill(`${newBuilding.zipCode}`);
    await this.buildingType.click();
    await this.page.locator(`text="${buildingType[randBuildingType]}"`).click();
    await this.buildingSqFootage.fill(`${randNumber}`);
    await this.buildingUtility.click();
    await this.page.locator(`text='${utility[0]}'`).click();
    await this.buildingRate.fill(`${randNumber}`);
    await this.buildingTags.click();
    await this.page.keyboard.type(`newtag`);
    await this.page.keyboard.press("Enter");
    const storeInfo = await this.storeNewBuildingInfo();
    await this.createBuildingBtn.click();
    await expect(this.createBuildingSuccessMsg).toBeVisible();
    await this.page.waitForLoadState("domcontentloaded");
    return storeInfo;
  }

  /*
  = Store Building info of new building
  */
  async storeNewBuildingInfo() {
    const buildingName = await this.buildingName.inputValue();
    const buildingAddress =
      (await this.buildingAddress.inputValue()) + ", 15419" + ", CA";
    const tag = await this.page.locator("div.css-1lxn4sj >> nth=0").innerText();

    return { buildingName, buildingAddress, tag };
  }

  /*
  = Edit and Update Building
  */
  async editAndUpdateBuilding() {
    await this.editBuildingTitle.fill(editBuilding.name);
    await this.buildingAddress.fill(editBuilding.address1);
    await this.buildingAddress2.fill(newBuilding.address2);
    await this.buildingState.click();
    await this.page.locator(`#react-select-2-listbox :text("${newBuilding.state}")`).click();
    await this.buildingZipCode.fill("15419");
    const storeInfo = await this.storeEditedBuildingInfo();
    await this.updateBuildingBtn.click();
    await expect(this.updateBuildingSuccessMsg).toBeVisible();
    await this.backBtn.click();

    return storeInfo;
  }

  /*
  = Store Building info of new building
  */
  async storeEditedBuildingInfo() {
    const buildingName = await this.editBuildingTitle.inputValue();
    const buildingAddress =
      (await this.buildingAddress.inputValue()) + ", 15419" + ", CA";

    return { buildingName, buildingAddress };
  }

  /*
  = Validate after editing building
  */
  async validatedEditedBuilding(buildingInfo) {
    await expect(
      this.page.locator(`h2.BuildingTile_tileTitle__k6Jjq >> nth=0`)
    ).toContainText(buildingInfo.buildingName);
    await expect(this.page.locator(`small >> nth=0`)).toContainText(
      buildingInfo.buildingAddress
    );
  }

  /*
  = Validate after editing building
  */
  async validatedEditedBuildingInListMode(buildingInfo) {
    await expect(
      this.page.locator(`h2.BuildingListItem_title__2YJ8J >> nth=0`)
    ).toContainText(buildingInfo.buildingName);
    await expect(this.page.locator(`small >> nth=0`)).toContainText(
      buildingInfo.buildingAddress
    );
  }

  /*
  = Filter and Validate
  */
  async filterAndValidate(buildingInfo) {
    await this.filterDropdown.click();
    await this.page.locator(`text="${buildingInfo.tag}"`).click();
    await expect(
      this.page.locator(`h2.BuildingTile_tileTitle__k6Jjq >> nth=0`)
    ).toBeVisible();
    await expect(this.page.locator(`small >> nth=0`)).toBeVisible();
  }

  /*
  = Click create new building button
  */
  async clickCreateNewBuildingBtn() {
    await this.createNewBuildingBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /*
  = Click edit building button
  */
  async clickEditBuildingBtn() {
    await this.editBuildingBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /*
  = Click list view edit building button
  */
  async clickListViewEditBuildingBtn() {
    await this.listViewEditBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /*
  = Click list view  button
  */
  async clickListViewBtn() {
    await this.listViewBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /*
  = Click edit building button
  */
  async clickFilterBtn() {
    await this.filterBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
