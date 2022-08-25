/**
* Creation Date: 18/03/2019
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
import { browser, protractor } from 'protractor';

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
const multitagName = 'NameCharacCDMultiTags';

Given(/^I have one PO that has all characteristic types to change including multitag$/, async ()=> {
    simpleDefPODevice = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsAndPSDefinition(user, pass);
});

Given(/^I move to characteristic tab of the PO with multitag characteristic$/, async ()=> {
    await navigateToTabs.openOnCharacteristicsTab(simpleDefPODevice[2], simpleDefPODevice[3], "definition");
    await waitElement.waitinvisibilityOf(loadingPage.loader, 18000);
});

When(/^I click in the more option of multitag characteristic$/, async()=>{
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle);
    let characteristicName = multitagName;
    let moreOption = await helper.getMoreOptionOfCharacteristicContainerByLabel(characteristicName + simpleDefPODevice[4]);
    await waitElement.waitElementClickable(moreOption);
    await moreOption.click();
});

When(/^I click into set sequence option$/, async()=>{
    let propertiesElm = await helper.getCharacteristicMoreOptionRowByName(characteristicPage.setSequenceText);
    await waitElement.waitElementClickable(propertiesElm);
    await propertiesElm.click();
});

When(/^I put a negative sequence value$/, async()=>{
    await waitElement.waitElementClickable(characteristicPage.sequenceInput);
    await characteristicPage.sequenceInput.click();
    await characteristicPage.sequenceInput.clear();
    await characteristicPage.sequenceInput.sendKeys('-5', protractor.Key.ENTER);
	await waitElement.waitElementCount(characteristicPage.progressSpinnerClass, 1);
    await waitElement.waitElementCount(characteristicPage.progressSpinnerClass, 0);
});

When(/^I wait the spinner save icon$/, async () => {
    await waitElement.waitElementCount(characteristicPage.progressSpinnerClass, 1);
    await waitElement.waitElementCount(characteristicPage.progressSpinnerClass, 0);
});

Then(/^the characteristic multitag card should appears at first position$/, async () => {
    let characteristicName = multitagName;
    let position = await helper.getCharacteristicCardContainerPositonByLabel(characteristicName + simpleDefPODevice[4]);
    expect(position.toString()).to.equal('2');
});