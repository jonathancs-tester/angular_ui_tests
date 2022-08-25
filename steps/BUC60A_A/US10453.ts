/**
* Creation Date: 02/09/2019
* Author: Lucas Abritta Costa
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2019, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { NavigateToTabs } from '../../Utils/NavigateToTabs';
import { ProductOfferingHandler } from '../../handlers/ProductOfferingHandler';
import { Given, When, Then } from 'cucumber';
import { Helper } from '../../Utils/Helpers/Helper';
import { WaitElements } from '../../Utils/waitElements';
import { expect } from 'chai'
import { CharacteristicHelper } from '../../Utils/Helpers/CharacteristicHelper';
import { CharacteristicsPage } from '../../pages/CharacteristicsPage';
import { by, element } from 'protractor';
import { UpdatePOWithRelated } from '../../testData/UpdatePOWithRelated';
import { PriceHandler } from '../../handlers/PriceHandler';
import { ProductOfferingDeviceHandler } from '../../handlers/ProductOfferingDeviceHandler';
import { DeviceHelper } from '../../Utils/Helpers/DeviceHelper';
import { DeviceSummaryPage } from '../../pages/DeviceSummaryPage';

const deviceSummaryPage = new DeviceSummaryPage();
const deviceHelper = new DeviceHelper();
const updatePOWithRelated = new UpdatePOWithRelated();
const priceHandler = new PriceHandler();
const characteristicPage = new CharacteristicsPage();
const characteristicHelper = new CharacteristicHelper();
const helper = new Helper();
const productOfferingHandler = new ProductOfferingHandler();
const navigateToTabs = new NavigateToTabs();
const waitElement = new WaitElements();
const productOfferingDeviceHandler = new ProductOfferingDeviceHandler();

const booleanCharacteristicName = 'NameCharacBoolean';
const integerCharacteristicName = "NameCharacInteger";
const stringCharacteristicName = "NameCharacString";
const regexCharacteristicName = "NameCharacRegex";
const sliderCharacteristicName = "NameCharacSlider";
const multiTagsCharacteristicName = "NameCharacCDMultiTags";
const multiSelectorCharacteristicName = "NameCharacCDMultiSelector";
const singleSelectorCharacteristicName = "NameCharacCDSingleSelector";
const dateCharacteristicName = "NameCharacDate";
const formulaCharacteristicName = "NameCharacFormula";

let PO = null;
const user = 'upadmin';
const pass = 'upadmin';
const DMPpsId = 'PS_1';
const numberDivTitle = 9;
const disabledClass = 'disabled';
let PODate = null;
let POid = null;
let priceId = null;

Given(/^I have one '([^\"]*)' PO in the version '([^\"]*)' that has all characteristic types as ReadOnlyOnExtension '([^\"]*)', ReadOnlyInNewVersions '([^\"]*)' and READONLY '([^\"]*)'$/, async (state: string, version: number, ReadOnlyOnExtension: boolean, ReadOnlyInNewVersions: boolean, READONLY: boolean)=> {
    if (version == 1) {
        PO = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsReadOnly(user, pass, state, DMPpsId, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        PODate = PO[3];
    } else {
        PO = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsReadOnly(user, pass, 'definition', DMPpsId, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        const timeSlice = await productOfferingHandler.createNTimeSlice(user, pass, state, version - 1, PO[2], PO[0], 30);
        PODate = timeSlice[2];
    }
    POid = PO[2];
});

Given(/^I have one '([^\"]*)' PO in the version '([^\"]*)' that has all price characteristic types as ReadOnlyOnExtension '([^\"]*)', ReadOnlyInNewVersions '([^\"]*)' and READONLY '([^\"]*)'$/, async (state: string, version: number, ReadOnlyOnExtension: boolean, ReadOnlyInNewVersions: boolean, READONLY: boolean)=> {
    if (version == 1) {
        PO = await priceHandler.createPOWithBuyNowWithCharacteristics(user, pass, state, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        PODate = await PO[3];
    } else {
        PO = await priceHandler.createPOWithBuyNowWithCharacteristics(user, pass, 'definition', ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        const timeSlice = await productOfferingHandler.createNTimeSlice(user, pass, state, version - 1, PO[2], PO[0], 30);
        PODate = await timeSlice[2];
    }
    POid = await PO[2];
    priceId = await PO[5];
});

Given(/^I have one '([^\"]*)' device PO in the version '([^\"]*)' that has all characteristic types as ReadOnlyOnExtension '([^\"]*)', ReadOnlyInNewVersions '([^\"]*)' and READONLY '([^\"]*)'$/, async (state: string, version: number, ReadOnlyOnExtension: boolean, ReadOnlyInNewVersions: boolean, READONLY: boolean)=> {
    PODate = await helper.getEffectiveDate(2);
    const start = Date.now();
    const POName = "PO_Device_" + start;
    if (version == 1) {
        PO = await productOfferingDeviceHandler.createProjPOWithDevicAllSupportedType(POName, PODate, user, pass, state, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
    } else {
        PO = await productOfferingDeviceHandler.createProjPOWithDevicAllSupportedType(POName, PODate, user, pass, 'definition', ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        const timeSlice = await productOfferingHandler.createNTimeSlice(user, pass, state, version - 1, PO[2], PO[0], 30);
        PODate = await timeSlice[2];
    }
    POid = PO[1];
});

Given(/^I extend this PO with characteristic to a new clean '([^\"]*)' PO with '([^\"]*)' versions$/, async (state: string, version: number)=> {
    const PO2Date = await helper.getEffectiveDate(+6);
    const relationPO = await productOfferingHandler.createPOInsideProjectWithPS(PO[0], PO[1], PO2Date, user, pass);
    POid = relationPO[0];
    await updatePOWithRelated.performPatch(POid, PO[2], PO[0], PO2Date, user, pass);
    PODate = PO2Date;
    if (version > 1) {
        const timeSlice = await productOfferingHandler.createNTimeSlice(user, pass, state, version - 1, POid, PO[0], 30);
        PODate = timeSlice[2];
    }
});

When(/^I go to the characteristic page for this '([^\"]*)' PO$/, async (state: string)=> {
    await navigateToTabs.openOnCharacteristicsTab(POid, PODate, state);
});

When(/^I open this '([^\"]*)' price that have all characteristics as read-only$/, async (state: string)=> {
    await navigateToTabs.openOnSpecificPOPrice(POid, PODate, state, priceId);
});

When(/^I go to the device page of this PO$/, async ()=> {
    await navigateToTabs.openOnDevicePage(POid, PODate, PO[0]);
});

When(/^I move to the device tab '([^\"]*)'$/, async (characteristicItem: string)=> {
    let item = await deviceHelper.getCharacteristicItemByLabel(characteristicItem);
    await item.click();
    await waitElement.waitElementCount(deviceSummaryPage.characteristicTitleClass, 0, "greater");
});

Then(/^I should not be able to edit the '([^\"]*)' characteristics$/, async (characteristic: string)=> {
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle, "greater");
    let characteristicName = null;
    let expectOptionCount = 1;
    let characteristicValueTag = 'input';
    let attributeDisable = 'disabled';
    switch(characteristic) {
        case 'string':
            characteristicName = stringCharacteristicName;
        break;
        case 'regex':
            characteristicName = regexCharacteristicName;
        break;
        case 'single selector':
            characteristicName = singleSelectorCharacteristicName;
            attributeDisable = 'readonly';
        break;
        case 'multi selector':
            characteristicName = multiSelectorCharacteristicName;
            attributeDisable = 'readonly';
        break;
        case 'multi tag':
            characteristicName = multiTagsCharacteristicName;
        break;
        case 'integer':
            characteristicName = integerCharacteristicName;
        break;
        case 'date':
            characteristicName = dateCharacteristicName;
        break;
        case 'boolean':
            characteristicName = booleanCharacteristicName;
            expectOptionCount = 2;
        break;
        case 'slider':
            characteristicName = sliderCharacteristicName;
            characteristicValueTag = 'cui-slider';
        break;
        case 'formula':
            characteristicName = formulaCharacteristicName;
        break;
    }
    const characteristicFullName = characteristicName + PO[4];
    if (characteristicName != formulaCharacteristicName) {
        let characteristicBody = await characteristicHelper.getCardBodyOfCharacteristicContainerByLabel(characteristicFullName);
        let characteristicValue = await characteristicBody.element(by.tagName(characteristicValueTag));
        if (characteristicName == sliderCharacteristicName) {
            expect(await characteristicValue.getAttribute("class")).to.contain('cui-slider-disabled');
        } else {
            expect(await characteristicValue.getAttribute(attributeDisable)).to.equals('true');
        }
    }
    let moreOption = await characteristicHelper.getMoreOptionOfCharacteristicContainerByLabel(characteristicFullName);
    await waitElement.waitElementClickable(moreOption);
    await moreOption.click();
    let optionCount = await characteristicPage.optionValues.count();
    expect(optionCount).to.equals(expectOptionCount);
    if (characteristic == 'boolean') {
        let clearValue = await characteristicHelper.getCharacteristicMoreOptionRowByName(characteristicPage.clearValueText);
        let parent = await helper.getElementParent(clearValue);
        expect(await parent.getAttribute('class')).to.contains(disabledClass);
    }
    await element(by.tagName('cui-backdrop-hidden')).click();
    let orderCapture = await waitElement.waitElementCount('.' + disabledClass + ' .popover-' + characteristicFullName.replace('Name', ''), 1);
    expect(orderCapture).to.equals(true);
    let elm0 = await characteristicHelper.getCharacteristicCardByLabel(characteristicFullName);
    let titleDiv = await elm0.element(by.tagName('label'));
    expect(await titleDiv.getAttribute('contenteditable')).to.equals('false');
});

Then(/^I should not be able to edit the '([^\"]*)' device characteristics$/, async (characteristic: string)=> {
    await waitElement.waitElementCount(deviceSummaryPage.characteristicTitleClass, 0, "greater");
    let characteristicName = null;
    let attributeDisable = 'disabled';
    let characteristicValueTag = 'input';
    switch(characteristic) {
        case 'string':
            characteristicName = stringCharacteristicName;
        break;
        case 'regex':
            characteristicName = regexCharacteristicName;
        break;
        case 'single selector':
            characteristicName = singleSelectorCharacteristicName;
            attributeDisable = 'readonly';
        break;
        case 'multi selector':
            characteristicName = multiSelectorCharacteristicName;
            attributeDisable = 'readonly';
        break;
        case 'multi tag':
            characteristicName = multiTagsCharacteristicName;
        break;
        case 'integer':
            characteristicName = integerCharacteristicName;
        break;
        case 'date':
            characteristicName = dateCharacteristicName;
        break;
        case 'boolean':
            characteristicName = booleanCharacteristicName;
        break;
        case 'slider':
            characteristicName = sliderCharacteristicName;
            characteristicValueTag = 'cui-slider';
        break;
        case 'formula':
            characteristicName = formulaCharacteristicName;
        break;
    }
    const characteristicFullName = characteristicName + PO[3];
    if (characteristicName != formulaCharacteristicName) {
        let characteristicElement = await deviceHelper.getCharacteristicElementByLabel(characteristicFullName);
        let characteristicValue = await characteristicElement.element(by.tagName(characteristicValueTag));
        if (characteristicName == sliderCharacteristicName) {
            expect(await characteristicValue.getAttribute("class")).to.contain('cui-slider-disabled');
        } else {
            expect(await characteristicValue.getAttribute(attributeDisable)).to.equals('true');
        }
    }
});

Then(/^the cardinality of '([^\"]*)' should be disabled$/, async (characteristic: string)=> {
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle, "greater");
    let characteristicName = null;
    switch(characteristic) {
        case 'single selector':
            characteristicName = singleSelectorCharacteristicName;
        break;
        case 'multi selector':
            characteristicName = multiSelectorCharacteristicName;
        break;
    }
    const characteristicFullName = characteristicName + PO[4];
    let cardinality = await characteristicHelper.getCharacteristicCardinalityByLabel(characteristicFullName);
    expect(await cardinality.getAttribute(disabledClass)).to.equals('true');
});