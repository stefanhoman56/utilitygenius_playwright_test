import { test, expect } from "@playwright/test";
import { ConfirmEmailPO } from './pageobjects/ConfirmEmailPO';
import {CreateFreeAccountPO} from './pageobjects/CreateFreeAccountPO';
import {CreateFreeAccountData} from './pagedata/PageData';
import { LoginPO } from "../tests/pageobjects/LoginPO";

test.describe('Verifying user can create a free account' , () =>{
  test(`Signing up` , async({page})=>{
    //Step1 : Go to home page
    await page.goto(`https://app.utilitygenius.com/`);
    const CreateFreeAccount = new CreateFreeAccountPO(page);

    //Step2 : Verify and Click on the Create Free Account Button
    await expect(CreateFreeAccount.createFreeAccountBtn).toHaveText(CreateFreeAccountData.createFreeAccount);
    await CreateFreeAccount.createFreeAccountBtn.click();

    //Step3 : Verify google sign up option and Sign up 
    await expect(CreateFreeAccount.googleSignupBtn).toHaveText(CreateFreeAccountData.googleSignUpButtonText);
    await CreateFreeAccount.signUp();
  });

  test(`Email confirmation and account creation confirmation` , async({page , context})=>{
    //Step1 : Go to 'yop mail' home page
    await page.goto("https://yopmail.com/en/");

    //Step2 : Sign in and go to inbox
    const ConfirmEmail = new ConfirmEmailPO(page);
    await ConfirmEmail.goToInbox();

    //Step3 : Click on the 'confirm your account'
    await ConfirmEmail.clickOnConfirmEmail();

    //Step4 : Log in and Verify account creation and upgrade account !!! (Got stuck there)
    const npage = await context.newPage();
    await npage.goto('/');
    const Login = new LoginPO(npage);
   
    // Step5 : User login with valid credentials
    await Login.enterLoginCredentialsAndClickOnLoginButtonFreeAccount();

    // Step6 : Verify home page URl
    await Login.verifyUpgradeAccountVisible();
  });
})
  
