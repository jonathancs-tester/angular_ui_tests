/**
* Creation Date: 08/03/2019
* Author: Lucas Abritta Costa
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2019, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { Given, When, Then, setDefaultTimeout } from 'cucumber'
import { WaitElements } from '../../Utils/waitElements';
import { POHandler } from '../../testData/POHandler';
import { NavigateToTabs } from '../../Utils/NavigateToTabs';
import { OverviewPOCanvasPage } from '../../pages/OverviewPOCanvasPage';
import { expect } from 'chai';
import { CreateOfferPage } from '../../pages/CreateOfferPage';
import { element, by } from 'protractor';

var createOfferPage = new CreateOfferPage();
const waitElement = new WaitElements();
const handler = new POHandler();
const navigateToTabs = new NavigateToTabs();
const overviewPOCanvasPage = new OverviewPOCanvasPage();

const apiUser = 'upadmin';
let activePOWithOptionalFor = null;

setDefaultTimeout(8000);

Given(/^I have an PO with a PS and one addon in active state$/, async () => {
    activePOWithOptionalFor = await handler.createBasicPOWithOptionalForAndActivateProject(apiUser, apiUser);
    await navigateToTabs.openOnCanvasTab(activePOWithOptionalFor[2], activePOWithOptionalFor[3], "active");
});

When(/^I click to remove the relation$/, async () => {
    await waitElement.waitElementCount(overviewPOCanvasPage.polygonAddedClass, 3);
    let polygonsAdded = await overviewPOCanvasPage.polygonsAdded;
    await waitElement.waitElementOpacityVisible(polygonsAdded[1]);
    await waitElement.waitvisibilityOf(overviewPOCanvasPage.cardMoreOptionIcon);
    await waitElement.waitElementClickable(overviewPOCanvasPage.cardMoreOptionIcon);
    await overviewPOCanvasPage.cardMoreOptionIcon.click();
    await waitElement.waitElementClickable(overviewPOCanvasPage.removePOOption);
    await overviewPOCanvasPage.removePOOption.click();
});

When(/^I click to cancel$/, async () => {
    await waitElement.waitElementPresence(createOfferPage.closeButton);
    await waitElement.waitElementClickable(createOfferPage.closeButton);
    await createOfferPage.closeButton.click();
    await waitElement.waitLoaderFinish();
});

Then(/^The new version tab should appears$/, async () => {
    let versionTabCount = await waitElement.waitElementCount(createOfferPage.backdropClass, 1);
    expect(versionTabCount).to.equal(true);
});