/**
* Creation Date: 29/05/2019
* Author: Márcio Rotella
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2019, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { NavigateToTabs } from '../../Utils/NavigateToTabs';
import { POHandler } from '../../testData/POHandler';
import { Given, When, Then } from 'cucumber';
import { WaitElements } from '../../Utils/waitElements';
import { expect } from 'chai';
import { MainPageHelper } from '../../Utils/Helpers/MainPageHelper';
import { MainPage } from '../../pages/MainPage';

const mainPage = new MainPage();
const mainPageHelper = new MainPageHelper();
const handler = new POHandler();
const navigateToTabs = new NavigateToTabs();
const waitElement = new WaitElements();

let PO = null;
const user = 'upadmin';
const pass = 'upadmin';

Given(/^I have a product on '([^\"]*)' state with PO and PS$/, async (state: string)=> {
    if(state == 'definition') {
        PO = await handler.createBasicProjectAndDefinitionPOAndPS(user, pass);
    }
    else if(state == 'active'){
        PO = await handler.createBasicPOAndPSAndActivateProject(user, pass);
    }
    await navigateToTabs.navigateToBrowse();
});

When(/^I navigate for Entity in Browse tabs$/, async()=>{
    await waitElement.waitElementClickable(mainPage.viewOptions);
    await mainPage.viewOptions.click();
    await waitElement.waitElementClickable(mainPage.entity);
    await mainPage.entity.click();
});

When(/^I should search the created '([^\"]*)'$/, async(type: string)=>{
    if(type == 'PO'){
        await waitElement.waitElementClickable(mainPage.PO);
        await mainPage.PO.click();
        await waitElement.waitElementClickable(mainPage.entitySearch);
        await mainPage.entitySearch.sendKeys(PO[2]);
    }
    else if(type == 'PS'){
        await waitElement.waitElementClickable(mainPage.PS);
        await mainPage.PS.click();
        await waitElement.waitElementClickable(mainPage.entitySearch);
        await mainPage.entitySearch.sendKeys(PO[1]);
    }
    await waitElement.waitElementCount(mainPage.cardTitleClass, 1, "equals", 60000);
});

When(/^I select List '([^\"]*)' Card option$/, async(type: string)=>{
    await waitElement.waitElementClickable(mainPage.listOption);
    await mainPage.listOption.click();
    await waitElement.waitElementCount(mainPage.cardListClass, 1, "greater", 60000);
});

When(/^I open details card by '([^\"]*)' option$/, async(mode: string)=>{
    let elem = await mainPageHelper.getDefaultCellByText(await PO[2]);
    if(mode == 'card'){
        await waitElement.waitElementClickable(elem);
        await elem.click();
    }
    else if(mode == 'menu') {
        await waitElement.waitElementCount(mainPage.cardMoreOptionsClass, 3);
        await waitElement.waitElementClickable(mainPage.moreOptionList);
        await mainPage.moreOptionList.click();
        let optionOpen = await mainPageHelper.getOptionWithName('Details');
        await waitElement.waitElementClickable(optionOpen);
        await optionOpen.click();
    }
});

Then(/^I should see '([^\"]*)' of the project in List Card$/, async(type: string)=>{
    const textSearch = await mainPage.entitySearch;
    const text = await textSearch.getAttribute("value");
    (type == 'PO') ? expect(text).to.contains(PO[2]) : expect(text).to.contains(PO[1]);
    const countDetails = await waitElement.waitElementCount(mainPage.cardListClass, 3);
    expect(await countDetails).to.equal(true);
    let elem = await mainPageHelper.getDefaultCellByText(await (type == 'PO') ? PO[2] : `${PO[1]}_name`);
    let rowText = await elem.getText();
    (type == 'PO') ? expect(rowText).to.contains(PO[2]) : expect(rowText).to.contains(PO[1]);
});

Then(/^I should see the page of details$/, async()=>{
    const textname = await waitElement.waitElementCount(mainPage.nameCardClass, 1);
    expect(textname).to.equal(true);
    const text = await mainPage.nameCard.getAttribute("value");
    expect(text).to.contains(PO[2]);

});