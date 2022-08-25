/**
* Creation Date: 06/09/2019
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
import { by, element, browser, protractor } from 'protractor';
import { UpdatePOWithRelated } from '../../testData/UpdatePOWithRelated';
import { PriceHandler } from '../../handlers/PriceHandler';
import { ProductOfferingDeviceHandler } from '../../handlers/ProductOfferingDeviceHandler';
import { DeviceHelper } from '../../Utils/Helpers/DeviceHelper';
import { DeviceSummaryPage } from '../../pages/DeviceSummaryPage';
import { CharacteristicHandler } from '../../handlers/CharacteristicHandler';

const characteristicHandler = new CharacteristicHandler();
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
let projectId = null;

Given(/^I have one definition PO that has all characteristic types$/, async ()=> {
    PO = await productOfferingHandler.createProjectWithPOWithAllCharacteristicsAndPSDefinition(user, pass);
    PODate = PO[3];
    POid = PO[2];
    projectId = PO[0];
});

Given(/^I have one characteristic group with '([^\"]*)' name and sequence as '([^\"]*)'$/, async (groupName: string, sequence: number)=> {
    const groupId = await characteristicHandler.createCharacteristicGroup(user, pass, projectId, POid, sequence, PODate, groupName);
});

When(/^I'm on the characteristic tab of the PO$/, async ()=> {
    await navigateToTabs.openOnCharacteristicsTab(POid, PODate, 'definition');
});

When(/^I set the sequence of the '([^\"]*)' characteristic to '([^\"]*)'$/, async (characName: string, sequence: number)=> {
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle, "greater");
    let characteristicName = null;
    switch(characName) {
        case 'string':
            characteristicName = stringCharacteristicName;
        break;
        case 'integer':
            characteristicName = integerCharacteristicName;
        break;
    }
    const characteristicFullName = characteristicName + PO[4];
    let moreOption = await characteristicHelper.getMoreOptionOfCharacteristicContainerByLabel(characteristicFullName);
    await waitElement.waitElementClickable(moreOption);
    await moreOption.click();
    let propertiesElm = await characteristicHelper.getCharacteristicMoreOptionRowByName(characteristicPage.setSequenceText);
    await waitElement.waitElementClickable(propertiesElm);
    await propertiesElm.click();
    await waitElement.waitElementCount(characteristicPage.setSequencePopUpClass, 1);
    await waitElement.waitElementOpacityVisible(characteristicPage.setSequencePopUp);
    await waitElement.waitElementClickable(characteristicPage.sequenceInput);
    await characteristicPage.sequenceInput.click();
    await characteristicPage.sequenceInput.clear();
    await characteristicPage.sequenceInput.sendKeys(sequence, protractor.Key.ENTER);
    if (sequence % 100 != 0) {
        await waitElement.waitElementClickable(characteristicPage.closePopOver);
        await characteristicPage.closePopOver.click();
        await waitElement.waitElementCount(characteristicPage.progressSpinnerClass, 1);
        await waitElement.waitElementCount(characteristicPage.progressSuccessClass, 1, "equals", 3000);
        await waitElement.waitElementCount(characteristicPage.progressSuccessClass, 0);
    }
});

When(/^I set the order capture control to '([^\"]*)' of the characteristic '([^\"]*)'$/, async (option: string, characName: string)=> {
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle, "greater");
    let characteristicName = null;
    switch(characName) {
        case 'string':
            characteristicName = stringCharacteristicName;
        break;
        case 'integer':
            characteristicName = integerCharacteristicName;
        break;
    }
    const characteristicFullName = characteristicName + PO[4];
    let orderCaptureControl = await characteristicHelper.getOrderCaptureControlByLabel(characteristicFullName);
    await waitElement.waitElementClickable(orderCaptureControl);
    await orderCaptureControl.click();
    let orderCaptureControlOption = await characteristicHelper.getOrderCaptureElementByLabel(option);
    await waitElement.waitElementClickable(orderCaptureControlOption);
    await orderCaptureControlOption.click();
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 1, 'equals', 3000);
    await waitElement.waitElementCount(characteristicPage.progressIconClass, 0);
});

Then(/^I should see the characteristics '([^\"]*)' in the group '([^\"]*)'$/, async (characteristicsInside: string, groupName: string)=> {
    if (characteristicsInside == '') {
        return;
    }
    let groupElements = await characteristicHelper.getCharacteristicGroupByName(groupName);
    let titles = await groupElements.all(by.css(characteristicPage.divCardTitlesLabelClass));
    let titlesValue = await helper.getElementTexts(titles, titles.length);
    const characteristic = characteristicsInside.split(',');
    for (let a = 0; a < characteristic.length; a++) {
        let characteristicName = null;
        switch(characteristic[a]) {
            case 'string':
                characteristicName = stringCharacteristicName;
            break;
            case 'integer':
                characteristicName = integerCharacteristicName;
            break;
        }
        const characteristicFullName = characteristicName + PO[4];
        expect(await titlesValue.indexOf(characteristicFullName) >= 0).to.equals(true);
    }
});

Then(/^I should see the sequence error message '([^\"]*)'$/, async (errorMessage: string)=> {
    await waitElement.waitElementWithText(characteristicPage.errorMessage, errorMessage);
    const errorMessageText = await characteristicPage.errorMessage.getText();
    expect(errorMessageText).to.contains(errorMessage);
});

Then(/^the group '([^\"]*)' is not under order characteristics section$/, async (groupName: string)=> {
    await waitElement.waitElementCount(characteristicPage.divCardTitleClass, numberDivTitle, "greater");
    let givenGroup = await characteristicHelper.getCharacteristicGroupByName(groupName);
    let orderGroup = await characteristicHelper.getCharacteristicGroupByName('Order Characteristics');
    expect(givenGroup != orderGroup).to.equals(true);
});
