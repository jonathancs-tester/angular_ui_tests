/**
* Creation Date: 30/05/2019
* Author: Erick Thomas
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
import { Helper } from '../../Utils/Helpers/Helper';
import { MainPage } from '../../pages/MainPage';
import { CategoryHandler } from '../../handlers/CategoryHandler';
import { ActivateProjectRest } from '../../testData/ActivateProjectRest';
import { ProductOfferingDeviceHandler } from '../../handlers/ProductOfferingDeviceHandler';
import { AttachmentPage } from '../../pages/AttachmentPage';
import { browser } from 'protractor';

const mainPage = new MainPage();
const helper = new Helper();
const mainPageHelper = new MainPageHelper();
const handler = new POHandler();
const navigateToTabs = new NavigateToTabs();
const waitElement = new WaitElements();
const categoryHandler = new CategoryHandler();
const activateProject = new ActivateProjectRest();
const productOfferingDeviceHandler = new ProductOfferingDeviceHandler();
const attachmentPage = new AttachmentPage();

let PO = null;
let item = null;
const user = 'upadmin';
const pass = 'upadmin';
let start = Date.now();
let POName = "PO_" + start;

Given(/^I have a project on '([^\"]*)' with PO and PS to search by '([^\"]*)'$/, async (state: string, method: string)=> {
    let POId = null;
    switch(method){
        case 'name':
            PO = await handler.createBasicProjectWithPOAndPSAndPOName(user, pass, POName);
            POId = PO[2];
            break;
        case 'id':
            PO = await handler.createBasicProjectAndDefinitionPOAndPS(user, pass);
            POId = PO[2];
            break;
        case 'device':
            const date = await helper.getEffectiveDate(+5);
            PO = await productOfferingDeviceHandler.createProjPODevice(POName, 'Device', date, user, pass, state);
            POId = PO[1];
            break;
        case 'description':
            PO = await handler.createProjectWithPOAndPSAndDescription(user, pass, 'definition');
            POId = PO[1];
            break;
    }
    await categoryHandler.assignPOToCategory(PO[0], POId, 'resCatalog', user, pass);
    if(state == 'active') {
        await activateProject.performPost(PO[0], user, pass);
    }
    await navigateToTabs.navigateToBrowse();
});

When(/^I navigate to Category in Browse tabs$/, async()=>{
    var browserSizeOfMe = browser.driver.manage().window().getSize().then(function(size) {
        console.log(" BROWSER SIZE "+ JSON.stringify(size) );
        return size;
    });
    await waitElement.waitElementCount(mainPage.viewOptionsClass, 0, "greater");
    await waitElement.waitElementClickable(mainPage.viewOptions);
    await mainPage.viewOptions.click();
    await waitElement.waitElementCount(mainPage.categoryClass, 1);
    await waitElement.waitElementClickable(mainPage.category);
    await mainPage.category.click();
});

When(/^I navigate to Entity in the Browser$/, async()=>{
    await waitElement.waitElementClickable(mainPage.viewOptions);
    await mainPage.viewOptions.click();
    await waitElement.waitElementCount(mainPage.entitySelectClass, 0);
    await waitElement.waitElementClickable(mainPage.entity);
    await mainPage.entity.click();
});

When(/^I search by '([^\"]*)'$/, async(method: string)=>{
    let value = null;
    await waitElement.waitElementCount(mainPage.entitySearchClass, 1, "equals", 60000);
    await waitElement.waitElementClickable(mainPage.entitySearch);
    switch(method){
        case 'name':
                value = PO[4];
            break;
        case 'id':
                value = PO[2];
            break;
        case 'device':
                value = "device";
            break;
    }
    await mainPage.entitySearch.sendKeys(value);
});

When(/^I switch the card view to list$/, async()=>{
    await waitElement.waitElementClickable(mainPage.listOption);
    await mainPage.listOption.click();
    await waitElement.waitElementCount(mainPage.cardListClass, 0, "greater", 90000);
});

When(/^I disable '([^\"]*)' options$/, async(column: string)=>{
    let optionDisable = null;
    let option = await mainPageHelper.getMainPageColumnIcon();
    await waitElement.waitElementClickable(option);
    await option.click();
    if (column == "all"){
        optionDisable = await mainPageHelper.getOptionsByText('State');
        await waitElement.waitElementClickable(optionDisable);
        await optionDisable.click();
        optionDisable = await mainPageHelper.getOptionsByText('Offer Name');
        await waitElement.waitElementClickable(optionDisable);
        await optionDisable.click();
        optionDisable = await mainPageHelper.getOptionsByText('Description');
        await waitElement.waitElementClickable(optionDisable);
        await optionDisable.click();
        optionDisable = await mainPageHelper.getOptionsByText('Type');
        await waitElement.waitElementClickable(optionDisable);
        await optionDisable.click();
    }else {
        optionDisable = await mainPageHelper.getOptionsByText(column);
        await waitElement.waitElementClickable(optionDisable);
        await optionDisable.click();
    }

});

When(/^I choose to see the '([^\"]*)'$/, async(category: string)=>{
    if(category == "PO"){
        await waitElement.waitElementClickable(mainPage.PO);
        await mainPage.PO.click();
    }else if(category == "PS"){
        await waitElement.waitElementClickable(mainPage.PS);
        await mainPage.PS.click();
    }
});

When(/^I sort the list by '([^\"]*)'$/, async(type: string)=>{
    let icon = null;
    let row = null;
    await waitElement.waitElementCount(mainPage.progressBarClass, 0, "equals", 60000);
    switch(type){
        case 'State':
            icon = await mainPageHelper.getSortingHeaders('State');
            break;
        case 'Description':
            icon = await mainPageHelper.getSortingHeaders('Description');
            break;
        case 'Offer Name':
            icon = await mainPageHelper.getSortingHeaders('Offer Name');
            break;
        case 'Type':
            icon = await mainPageHelper.getSortingHeaders('Type');
            break;
    }
    await waitElement.waitElementClickable(icon);
    await icon.click();
    row = await mainPage.tableRows;
    await waitElement.waitElementOpacityVisible(await row[0], 60000);
});

Then(/^I should see the right card showed by '([^\"]*)'$/, async(method: string)=>{
    let textOnField = null;
    let textSearch = null;
    switch(method){
        case 'name':
            item = PO[4];
            textSearch = PO[4];
            break;
        case 'id':
            item = PO[2];
            textSearch = PO[2]
            break;
        case 'device':
            item = PO[3];
            textSearch = 'device';
            break;
    }
    textOnField = await mainPage.entitySearch.getAttribute('value');
    expect(textOnField).to.contains(textSearch);
    const countDetails = await waitElement.waitElementCount(mainPage.stateStatusClass, 0, "greater", 60000);
    expect(await countDetails).to.equal(true);
    let elem = await mainPageHelper.getDefaultCellByText(item);
    expect(await elem.getText()).to.contains(item);
});

Then(/^I can not be able to see the '([^\"]*)' column$/, async(column: string)=>{
    let elem = null;
    let countDetails = null;
    if (column == "all"){
        countDetails = await waitElement.waitElementCount(mainPage.hiddenColumnClass, 8);
        expect(await countDetails).to.equal(true);
        elem = await mainPageHelper.getDefaultCellByText(PO[2]);
        expect(elem).to.null;
    }else {
        countDetails = await waitElement.waitElementCount(mainPage.hiddenColumnClass, 2);
        expect(await countDetails).to.equal(true);
        let columnCheck = await mainPageHelper.isBrowserPageColumnHidden(column);
        expect(columnCheck).to.equal(true);
    }
});

Then(/^I should see if the arrow is '([^\"]*)'$/, async(direction: string)=>{
    let countDetails = null;
    if (direction == "Ascending"){
        countDetails = await waitElement.waitElementCount(attachmentPage.arrowAscendingClass, 2);
    }else if(direction == "Descending"){
        countDetails = await waitElement.waitElementCount(attachmentPage.arrowDescendingClass, 2);
    }
    expect(await countDetails).to.equal(true);
    let elem = await mainPageHelper.getDisplayedArrow(direction);
    expect(elem).to.not.null;
});

Then(/^I should see if the column '([^\"]*)' is '([^\"]*)'$/, async(type: string, ordination: string)=>{
    let status = null;
    await waitElement.waitElementCount(mainPage.cardListClass, 3, "greater", 60000);
    switch(type){
        case 'State':
            status = await mainPageHelper.isStateAscending();
            break;
        case 'Description':
            status = await mainPageHelper.isDescriptionAscending();
            break;
        case 'Offer Name':
            status = await mainPageHelper.isOfferNameAscending();
            break;
        case 'Type':
            status = await mainPageHelper.isTypeAscending();
            break;
    }
    if (ordination == "Ascending"){
        expect(await status).to.equal(true);
    }else if(ordination == "Descending"){
        expect(await status).to.equal(false);
    }
});