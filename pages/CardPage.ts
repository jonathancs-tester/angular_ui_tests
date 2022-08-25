/**
 * Creation Date: 29/06/2018
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';


export class CardPage {
  cardTab = element(by.css('.ft-overview'));
  activatePO = element(by.cssContainingText('.ft-inline-message-action', 'Activate'));
  activateCheck = element(by.css('.ft-action-dialog-confirm'));
  cancelCheck = element(by.css('.ft-action-dialog-cancel'));
  POCardName = element(by.css('.node-title'));
  startDateNewVersion = element(by.css('#startDate > div:nth-child(1) > span:nth-child(3)'));
  datePicker = element(by.css('#startDate > div:nth-child(1) > cui-date-time-picker:nth-child(4) > cui-icon:nth-child(1)'));
  datePickerNextMonth = element(by.css('.date-month-picker > div:nth-child(1) > cui-icon:nth-child(3)'));
  datePickerDay = element(by.css('tr.ng-star-inserted:nth-child(5) > td:nth-child(5)'));
  datePickerApplyButton = element(by.css('button.ng-star-inserted:nth-child(2)'));
  projectName = element(by.css('#txtProject'));
  saveButton = element(by.css('.dialog-footer > button:nth-child(2)'));
  cancelButton = element(by.css('button.cui-button:nth-child(1) > span:nth-child(1)'));
  closeCheck = element(by.css('.ft-action-dialog-close'));
  infoCardResults = element(by.css('.ft-info-card-name'));
  POCreated = element(by.css('.ft-dropdown-name'));
  POCreatedCard = element(by.css('.node-title'));
  POVersionSec = element(by.css('.ft-cui-row:nth-child(3)'));
  status = element(by.css('.ng-trigger-showState'));
  arrowVersions = element(by.css('.dropdown-panel-item div div cui-icon'));
  infoPOTab = element(by.css('li.fab-btn:nth-child(1) > img:nth-child(1)'));
  definitionVersion = element(by.css('cui-row.ft-cui-row:nth-child(3) > cui-column:nth-child(1)'));
  activeVersion = element(by.css('cui-row.ft-cui-row:nth-child(2) > cui-column:nth-child(1) > a:nth-child(1)'));
  closeMessageActivatePO = element(by.css('.close'));
  deleteVersion = element(by.css('cui-action-menu-item.cui-action-menu-item:nth-child(3) > span:nth-child(1)'));
  datePO = element(by.css('.field-header'));
  recurringPrice = element(by.css('.ft-r'));
  allowancePrice = element(by.css('.ft-alwc'));
  usagePrice = element(by.css('.ft-u'));
  oneTimePrice = element(by.css('.ft-o'));
  infoTab = element.all(by.css('.fab-btn.tab.ng-star-inserted')).get(0);
  originalPrice = element(by.css('.original-price-value'));
  priceValue = element(by.css('.ft-price-value'));
  infoCardDescription = element(by.css('.ft-info-card-description'));
  activationMessage = element(by.css('.ft-inline-message-title'));
  allVersions = element.all(by.css('.ft-cui-row'));
  copyOfferAction = element(by.cssContainingText('.cui-action-menu-item', 'Copy Offer'));
  copyModalButton = element(by.css('.ft-create'));
  resultCardPOClass = '.ft-card-title';
  resultCardPO = element(by.css(this.resultCardPOClass));
  productOffering = element(by.css('.ft-top-title-type'));
  productOfferingID = element(by.css('.ft-top-title-product-id'));
  productOfferingHID = element(by.css('.ft-top-title-hid'));
  cuiRowClass = '.ft-cui-row';
  action = element(by.css('.ft-ACTIONS'));
  translate = element(by.cssContainingText('.cui-action-menu-item', 'Translate'));
}
