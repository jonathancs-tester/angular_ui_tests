/**
* Creation Date: 30/06/2018
* Author: Andreivan P. dos Santos
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2018, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { MainPage } from '../../pages/MainPage';
import { Given, When, Then, setDefaultTimeout } from 'cucumber';
import { expect } from 'chai';
import { LoginPage } from '../../pages/LoginPage';
import { config } from '../config';
import { WaitElements } from '../../Utils/waitElements';
import { browser } from 'protractor';

var mainPage = new MainPage();
var loginPage = new LoginPage();
var waitElement = new WaitElements();

setDefaultTimeout(80000);

Given(/^I'm on the login page$/, async () => {
  await loginPage.OpenBrowser(config.baseUrl + '/auth/#/login');
  var browserSizeOfMe = browser.driver.manage().window().getSize().then(function(size) {
    console.log(" BROWSER SIZE "+ JSON.stringify(size) );
    return size;
  });
});

Given(/^I type the user '([^\"]*)'$/, async (user: string) => {
  await loginPage.user.clear();
  await loginPage.user.sendKeys(user);
});

Given(/^password '([^\"]*)'$/, async (password: string) => {
  await loginPage.password.clear();
  await loginPage.password.sendKeys(password);
});

When(/^I hit the login button$/, async () => {
  await waitElement.waitElementClickable(loginPage.loginButton, 20000);
  await loginPage.loginButton.click();
});

Then(/^I should access the application$/, async () => {
  await waitElement.waitElementClickable(mainPage.logoutButton, 20000);
  await mainPage.logoutButton.click();
  await waitElement.waitElementClickable(mainPage.signOutOption, 20000);
  await mainPage.signOutOption.click();
  await waitElement.waitElementClickable(mainPage.signOutConfirm, 20000);
  await mainPage.signOutConfirm.click();
});

Then(/^I should see the message of error$/, async () => {
  await waitElement.waitElement(loginPage.validationMessage, 25000);
  await expect(await loginPage.validationMessage.getText()).to.be.equals('Invalid username or password.');
  await loginPage.user.clear();
  await loginPage.password.clear();
});
