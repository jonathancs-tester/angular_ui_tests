/**
* Creation Date: 14/03/2019
* Author: Lucas Abritta Costa
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2019, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { WaitElements } from '../../Utils/waitElements';
import { NavigateToTabs } from '../../Utils/NavigateToTabs';
import { Given, When, Then } from 'cucumber';
import { CharacteristicsPage } from '../../pages/CharacteristicsPage';
import { expect } from 'chai';
import { ProductOfferingHandler } from '../../handlers/ProductOfferingHandler';
import { LoadingPage } from '../../pages/LoadingPage';
import { CharacteristicHelper } from '../../Utils/Helpers/CharacteristicHelper';
import { by, browser, protractor } from 'protractor';

const helper = new CharacteristicHelper();
const characteristicPage = new CharacteristicsPage();
const waitElement = new WaitElements();
const navigateToTabs = new NavigateToTabs();
const productOfferingHandler = new ProductOfferingHandler();
const loadingPage = new LoadingPage();

const user = 'upadmin';
const pass = 'upadmin';

let simpleDefPODevice = null;
const numberDivTitle = 11; //number of card + 1
const maxLenString = 'maxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenSngmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxL';
const maxLenWithSpecialCharString = '¨axLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenStringmaxLenSt';

Given(/^I have one PO that has all characteristic types to change including string$/, async ()=> {
    simpleDefPODevice = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsAndPSDefinition(user, pass);
});

Given(/^I move to characteristic tab of the PO with string characteristic$/, async ()=> {
    await navigateToTabs.openOnCharacteristicsTab(simpleDefPODevice[2], simpleDefPODevice[3], "definition");
    await waitElement.waitinvisibilityOf(loadingPage.loader, 18000);
});

When(/^the value of string characteristics is set to max length and special character$/, async()=>{
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle);
    let elm0 = await helper.getCardBodyOfCharacteristicContainerByLabel("NameCharacString" + simpleDefPODevice[4]);
    let stringValueDivToChange = await elm0.element(by.tagName('app-characteristic-value div div app-text-handler div input'));
    await stringValueDivToChange.click();
    await stringValueDivToChange.clear();
    await stringValueDivToChange.sendKeys(maxLenWithSpecialCharString, protractor.Key.ENTER);
});

When(/^the value of string characteristics is set to with max length$/, async()=>{
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle);
    let elm0 = await helper.getCardBodyOfCharacteristicContainerByLabel("NameCharacString" + simpleDefPODevice[4]);
    let stringValueDivToChange = await elm0.element(by.tagName('app-characteristic-value div div app-text-handler div input'));
    await stringValueDivToChange.click();
    await stringValueDivToChange.clear();
    await stringValueDivToChange.sendKeys(maxLenString, protractor.Key.ENTER);
});

When(/^I wait to save the string value$/, async () => {
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 1);
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 0);
});

Then(/^the new value of special string characteristic is not persisted$/, async () => {
    let elm0 = await helper.getCardBodyOfCharacteristicContainerByLabel("NameCharacString" + simpleDefPODevice[4]);
    let stringValueDivToChange = await elm0.element(by.tagName('app-characteristic-value div div app-text-handler div input'));
    expect(await stringValueDivToChange.getAttribute('value')).to.equal('string value');
});

Then(/^the new value of special string characteristic is persisted$/, async () => {
    let elm0 = await helper.getCardBodyOfCharacteristicContainerByLabel("NameCharacString" + simpleDefPODevice[4]);
    let stringValueDivToChange = await elm0.element(by.tagName('app-characteristic-value div div app-text-handler div input'));;
    expect(await stringValueDivToChange.getAttribute('value')).to.contain(maxLenString);
});