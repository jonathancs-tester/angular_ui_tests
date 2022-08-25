/**
* Creation Date: 25/01/2019
* Author: Andreivan P. dos Santos
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2018, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { Given, When, Then } from "cucumber";
import { ProductOfferingHandler } from "../../handlers/ProductOfferingHandler";
import { Helper } from "../../Utils/Helpers/Helper";
import { NavigateToTabs } from "../../Utils/NavigateToTabs";
import { ChargeTypeHandler } from "../../handlers/ChargeTypeHandler";
import { AddPrice } from "../../Utils/AddPrice";
import { PricePage } from "../../pages/PricePage";
import { expect } from 'chai'
import { waitForElement } from "protractor-helpers";
import { WaitElements } from "../../Utils/waitElements";

let helper = new Helper();
let po = new ProductOfferingHandler();
let ct = new ChargeTypeHandler();
let navigate = new NavigateToTabs();
let addPrice = new AddPrice();
let pricePage = new PricePage();
let waitElement = new WaitElements();

let createDefintionPO = null;
let ctM = null
const apiUser = 'upadmin';
const apiPass = 'upadmin';


Given(/^I have a po with start date today plus 8 days$/, async ()=> {
    let poDate = await helper.getEffectiveDate(+8);
    createDefintionPO = await po.createBasicProjectWithPOAndPSDefinition(poDate, apiUser, apiPass); 
    await navigate.openOnPriceTabPO(createDefintionPO[2], createDefintionPO[3], 'definition');     
});

Given(/^I have a charge type with the start date today plus 10 days$/, async ()=> {
    let projectDate = await helper.getEffectiveDate(+10);
    let ctDate = await helper.getDateCT(+10);
    ctM = await ct.createProjAndCTMonthly(15, projectDate, ctDate, apiUser, apiPass);    
});

When(/^I select this po and search the charge type on the drawer$/, async ()=> {
    await addPrice.searchPriceByCardBtnThroughKick(ctM[1], pricePage.ctRecurringType);
});

Then(/^the charge type should not be showed$/, async ()=> {
    let string = 'No Items Found';
    await waitElement.waitElementWithText(pricePage.noItemsFound, string, 10000);
    expect(await pricePage.noItemsFound.getText()).to.equal(string);
});




