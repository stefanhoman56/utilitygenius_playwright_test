import {
  randomString,
  currentYearMonthDate,
  currentTime,
  randNumber,
} from "../../helpers/util";

export const LoginData = {
  //email: "testdata@yopmail.com",
  email: "snape793@gmail.com",
  //password: "Android@123",
  password: "oaU40T@P6RT5",
  invalidPassword: "123451",
  errorMessage: "Wrong email or password.",
};
export const searchRebatesPageData = {
  headerText: "Find a Program",
  utility: "Pacific Gas & Electric Co.",
};
export const allUtilityPageData = {
  headerText: "Searching All Utilities",
};
export const pricingPageData = {
  headerText: "Pricing and Plans",
};
export const ResourceLinkData = {
  headerText: "Reports",
};
export const HelpCenterPageData = {
  headerText: "Help Center",
  email: "testdata@gmail.com",
  subject: "Automate Utility Genius",
  description: "Automate UtilityGenius Using playwright",
  successMessage:
    "Thank you for reaching out! Your UtilityGenius expert will get back to you within the next 24 business hours.",
};
export const FeedBackPageData = {
  headerText: "Product Feedback",
};
export const MyUtilityPageData = {
  headerText: "Favorite Utilities",
};
export const myWidgetPageData = {
  headerText: "My Widgets",
  widgetName: "Test" + randomString,
  widgetLocation: "www.google.com",
};

export const CreateFreeAccountData = {
  email: `sh${currentYearMonthDate}@yopmail.com`,
  password: "Password123",
  fullName: "Siam Hasan",
  createFreeAccount: "Create Free Account",
  googleSignUpButtonText: "Sign up with Google",
};

//------------------------------------

export const newBuilding = {
  name: `BuildingName`,
  address1: `Address 1`,
  address2: `Address 2`,
  zipCode: `15419`,
  city: "San Diego",
  state: "California",
};

export const buildingType = [
  "Education",
  "Exterior",
  "Grocery",
  "Health",
  "Office",
  "Retail",
];

export const utility = ["West Penn Power Company"];

export const editBuilding = {
  name: `Building${randNumber}`,
  address1: `Address${randNumber}`,
  address2: `Address${randNumber}`,
};
