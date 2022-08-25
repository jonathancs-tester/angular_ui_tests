/**
* Creation Date: 28/05/2019
* Author: Lucas Abritta Costa
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
import { MainPage } from '../../pages/MainPage';
import { CategoryHandler } from '../../handlers/CategoryHandler';
import { ActivateProjectRest } from '../../testData/ActivateProjectRest';
import { Helper } from '../../Utils/Helpers/Helper';
import { MainPageHelper } from '../../Utils/Helpers/MainPageHelper';
import { CardPage } from '../../pages/CardPage';
import { browser } from 'protractor';

const cardPage = new CardPage();
const helper = new Helper();
const mainPageHelper = new MainPageHelper();
const activateProject = new ActivateProjectRest();
const mainPage = new MainPage();
const handler = new POHandler();
const navigateToTabs = new NavigateToTabs();
const waitElement = new WaitElements();
const categoryHandler = new CategoryHandler();

let PO = null;
const user = 'upadmin';
const pass = 'upadmin';
let elementLevel = [];

Given(/^I have one '([^\"]*)' offer with the category '([^\"]*)'$/, async (state: string, category: string)=> {
    let categoryId = category;
    switch(category) {
        case 'Enterprise':
            categoryId = 'entCatalog';
            break;
        case 'Headphones':
            categoryId = 'resHeadphones';
            break;
        case 'Devices':
            categoryId = 'resDevice';
            break;
        case 'NetworkServices':
            categoryId = 'NetworkServices';
            break;
    }
    PO = await handler.createBasicProjectAndDefinitionPOAndPS(user, pass);
    await categoryHandler.assignPOToCategory(PO[0], PO[2], categoryId, user, pass);
    if(state == 'active') {
        await activateProject.performPost(PO[0], user, pass);
    }
    await navigateToTabs.navigateToBrowse();
});

When(/^I select category in the browser panel$/, async()=>{
    await waitElement.waitElementClickable(mainPage.viewOptions);
    await mainPage.viewOptions.click();
    await waitElement.waitElementCount(mainPage.categoryClass, 1);
    await waitElement.waitElementClickable(mainPage.category);
    await mainPage.category.click();
});

When(/^I navigate to the level 0 category '([^\"]*)'$/, async(category: string)=>{
    let rootLevelElement = await mainPage.getRootLevelCategory(category);
    await waitElement.waitElementClickable(rootLevelElement);
    await rootLevelElement.click();
    await waitElement.waitElementCount(mainPage.browseCardClass, 0, "greater");
});

When(/^I navigate to the level '([^\"]*)' category '([^\"]*)'$/, async(categoryLevel:string, category: string)=>{
    let categoryLevelNumber = parseInt(categoryLevel) + 1;
    elementLevel = [];
    switch(category) {
        case 'Headphones':
            elementLevel.push("Residential", "Mobile", "Accessories", "Headphones");
            break;
        case 'Devices':
            elementLevel.push("Residential", "Mobile", "Devices");
            break;
        case 'NetworkServices':
            elementLevel.push("Business", "Network Services");
            break;
    }
    let rootElem = await mainPage.getRootLevelCategory(elementLevel[0]);
    await waitElement.waitElementClickable(rootElem);
    await rootElem.click();
    for (let a = 1; a < categoryLevelNumber; a++) {
        await waitElement.waitElementCount(mainPage.categoryPathClass, a);
        let elem = await mainPageHelper.getCategoryLevelNByText(elementLevel[a]);
        await waitElement.waitElementClickable(elem);
        await elem.click();
    }
    await waitElement.waitElementCount(mainPage.browseCardClass, 0, "greater");
});

When(/I search for the created PO$/, async()=>{
    var browserSizeOfMe = browser.driver.manage().window().getSize().then(function(size) {
        console.log(" BROWSER SIZE "+ JSON.stringify(size) );
        return size;
    });
    await waitElement.waitElementClickable(mainPage.entitySearch);
    await mainPage.entitySearch.sendKeys(PO[2]);
});

When(/I click on the back arrow$/, async()=>{
    await waitElement.waitElementCount(mainPage.goBackButtonClass, 1);
    await waitElement.waitElementClickable(mainPage.goBackButton);
    await mainPage.goBackButton.click();
});

When(/^I open card details using the mode '([^\"]*)'$/, async(mode: string)=>{
    if(mode == 'menu'){
        await waitElement.waitElementClickable(mainPage.PORectangleCardMoreOptions);
        await mainPage.PORectangleCardMoreOptions.click();
        let optionOpen = await mainPageHelper.getOptionWithName('Details');
        await waitElement.waitElementClickable(optionOpen);
        await optionOpen.click();
    }
    else if(mode == 'card'){
        await waitElement.waitElementClickable(mainPage.resultCardPO);
        await mainPage.resultCardPO.click();
    }
    await waitElement.waitLoaderFinish();
});

Then(/^the created PO should be displayed$/, async()=>{
    let cardCount = await waitElement.waitElementCount(mainPage.cardTitleClass, 1);
    expect(cardCount).to.equals(true);
    let titleCard = await mainPage.resultCardPO;
    expect(await titleCard.getAttribute('title')).to.contain(PO[2]);
});

Then(/^the category path should be correct with '([^\"]*)' levels$/, async(levelNumbers: string)=>{
    let levelNumber = parseInt(levelNumbers) + 1;
    let pathLevelCount = await waitElement.waitElementCount(mainPage.categoryPathClass, levelNumber);
    expect(pathLevelCount).to.equal(true);
    await waitElement.waitElementWithText(await mainPage.categoryPaths.last(), elementLevel[levelNumber - 1].toUpperCase());
    let pathElements = await helper.getElementTexts(await mainPage.categoryPaths, await mainPage.categoryPaths.count());
    for (let a = 0; a < levelNumber; a++) {
        expect(pathElements.toString()).to.contain(elementLevel[a].toUpperCase());
    }
});

Then(/^I should see the details page of the PO$/, async()=>{
    const countCards = await waitElement.waitElementCount(mainPage.nameCardClass, 1);
    expect(await countCards).to.equal(true);
    expect(await cardPage.infoCardResults.isPresent()).to.equal(true);
    expect(await mainPage.nameCard.getAttribute('value')).to.contains(PO[2]);
});