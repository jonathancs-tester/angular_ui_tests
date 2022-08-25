/**
 * Creation Date: 12/06/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class DeviceSummaryPage {
  deviceName = element(by.css('.ft-info-card-name'));
  doneButton = element.all(by.css('.ng-star-inserted button span')).get(3);
  addNewDevice = element(by.css('.material-icons.std-icon.add.ng-star-inserted'));
  deviceHeader = element(by.css('header'));
  originalPriceValue = element(by.css('.ft-price-value'));
  moreIconClass = 'single-action row-click-disabled';
  threeDots = element(by.className(this.moreIconClass));
  classRowName = '.ft-row-name';
  rowName = element(by.css(this.classRowName));
  okButton = element(by.css('.ft-action-dialog-confirm'));
  characteristicClass = '.characteristic';
  characteristicTitleClass = '.characteristic-title label';
  characteristicsTitle = element.all(by.css(this.characteristicTitleClass));
  characteristicItems = element.all(by.css('.ft-item-characteristic .label'));
}
