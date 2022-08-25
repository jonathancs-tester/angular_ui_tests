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

const characteristicPage = new CharacteristicsPage();
const waitElement = new WaitElements();
const navigateToTabs = new NavigateToTabs();
const productOfferingHandler = new ProductOfferingHandler();
const loadingPage = new LoadingPage();

const user = 'upadmin';
const pass = 'upadmin';

let simpleDefPODevice = null;
let leverValue = null;
const numberDivTitle = 11; //number of card + 1

Given(/^I have one PO that has all characteristic types to change including boolean$/, async ()=> {
    simpleDefPODevice = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsAndPSDefinition(user, pass);
});

Given(/^I move to characteristic tab of the PO with boolean characteristic$/, async ()=> {
    await navigateToTabs.openOnCharacteristicsTab(simpleDefPODevice[2], simpleDefPODevice[3], "definition");
    await waitElement.waitinvisibilityOf(loadingPage.loader, 18000);
});

When(/^I set the boolean to '([^\"]*)'$/, async(value: string)=>{
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle);
    leverValue = await characteristicPage.lever;
    await leverValue.click();
});

When(/^I wait to save the boolean value$/, async () => {
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 1);
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 0);
});

Then(/^the unset message should not appears$/, async () => {
    expect(await waitElement.waitElementCount(characteristicPage.unsetMessageClass, 0)).to.equal(true);
});