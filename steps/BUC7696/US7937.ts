/**
* Creation Date: 27/05/2019
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
import { CardPage } from '../../pages/CardPage';

const mainPage = new MainPage();
const cardPage = new CardPage();
const mainPageHelper = new MainPageHelper();
const handler = new POHandler();
const navigateToTabs = new NavigateToTabs();
const waitElement = new WaitElements();

let PO = null;
const user = 'upadmin';
const pass = 'upadmin';

Given(/^I have a Offer in '([^\"]*)' state with PO and PS$/, async (state: string)=> {
    if(state == 'definition') {
        PO = await handler.createBasicProjectAndDefinitionPOAndPS(user, pass);
    }
    else if(state == 'active'){
        PO = await handler.createBasicPOAndPSAndActivateProject(user, pass);
    }
    await navigateToTabs.navigateToBrowse();
});

When(/^I navigate to Entity in Browse tab$/, async()=>{
    await waitElement.waitElementClickable(mainPage.viewOptions);
    await mainPage.viewOptions.click();
    await waitElement.waitElementClickable(mainPage.entity);
    await mainPage.entity.click();
});

When(/^I search the created PO$/, async()=>{
    await waitElement.waitElementClickable(mainPage.entitySearch);
    await mainPage.entitySearch.sendKeys(PO[2]);
    await waitElement.waitElementCount(mainPage.cardTitleClass, 1);
});

When(/^I select Graphical Card UI option$/, async()=>{
    await waitElement.waitElementClickable(mainPage.graphicalOptions);
    await mainPage.graphicalOptions.click();
    await waitElement.waitElementCount(mainPage.graphicalClass, 1);
});

When(/^I open details card by '([^\"]*)'$/, async(mode: string)=>{
    if(mode == 'card'){
        await waitElement.waitElementClickable(mainPage.card);
        await mainPage.card.click();
    }
    else if(mode == 'menu'){
        await waitElement.waitElementClickable(mainPage.cardMoreOptions);
        await mainPage.cardMoreOptions.click();
        let optionOpen = await mainPageHelper.getOptionWithName('Details');
        await waitElement.waitElementClickable(optionOpen);
        await optionOpen.click();
    }
});

Then(/^I should see Offer in Graphical Card UI$/, async()=>{
    const textSearch = await mainPage.entitySearch.getAttribute('value');
    expect(textSearch).to.contains(PO[2]);
    const countGraphical = await waitElement.waitElementCount(mainPage.graphicalClass, 1);
    expect(await countGraphical).to.equal(true);
});

Then(/^I should see details page$/, async()=>{
    const countCards = await waitElement.waitElementCount(mainPage.nameCardClass, 1);
    expect(await countCards).to.equal(true);
    expect(await cardPage.infoCardResults.isPresent()).to.equal(true);
    expect(await mainPage.nameCard.getAttribute('value')).to.contains(PO[2]);
});

