/**
 * Creation Date: 15/07/2019
 * Author: Andreivan P dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';
import { async } from 'q';

export class TranslationPage {
  languagesContainer = element.all(by.css('.card.ng-star-inserted'));
  languageCards = this.languagesContainer.all(by.css('.wrapper-text'));
  cancelButton = element(by.css('.ft-cancel'));
  selectLanguage =  async function (language) {
     await element(by.xpath(`//span[. = '${language}']`)).click();
  }
  overviewSection = element.all(by.css('.translate-offer-overview dt'));
  overviewSectionNameFrom = element.all(by.css('.translate-offer-overview dd'));
  doneButton = element(by.css('.custom-button span'));
  languageLabel = element.all(by.tagName('app-custom-select label'));
  allLanguagesClass = '.ng-star-inserted';
  languageSelectorClass ='.ng-valid';
  languageChange = element(by.css(this.allLanguagesClass));
  swapLanguages = element(by.css('.swap-languages'));
  attachmentSection = element.all(by.css('.translate-offer-attachment dt'));
  attachmentSectionNameFrom = element.all(by.css('.translate-offer-attachment dd'));
  arrowSections = element.all(by.css('.mat-expansion-panel-header-title'));
  attachmentNumber = element.all(by.css('.translate-offer-attachment dl'));
  translateCardContainer = element(by.css('.translate-card-container'));
  descriptionSection = element.all(by.css('.translate-offer-description dt'));
  descriptionSectionNameFrom = element.all(by.css('.translate-offer-description dd'));
  ruleSection = element.all(by.css('.translate-offer-rules dt'));
  ruleSectionNameFrom = element.all(by.css('.translate-offer-rules dd'));
  characteristicSection = element.all(by.css('.translate-offer-characteristics dt'));
  characteristicNameFrom = element.all(by.css('.translate-offer-characteristics dd'));
  moreGroupCharac = element(by.css('.toggle-button.ng-star-inserted'));
  inputCharacNames = element.all(by.css('.ft-to-characteristic-name input'));
  inputCharacName = element(by.css('.ft-to-characteristic-name input'));
  groupCharacFromName = element.all(by.css('.ft-from-characteristic-group-name'));
  priceCharac = element.all(by.css('.price-characteristics'));
  priceGroupName = element.all(by.css('.ft-from-price-name'));
  priceRuleName = element.all(by.css('.ft-from-price-rule-name'));
  characteristicInput = function (characteristicId) {
    return element(by.css(`.ft-characteristic-${characteristicId} input`));
  }
  inputPriceRule = element(by.css('.ft-to-price-rule-name input'));
}
