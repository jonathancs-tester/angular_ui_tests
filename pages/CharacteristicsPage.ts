/**
 * Creation Date: 17/12/2018
 * Author: Fabiana Fraga Ferreira
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class CharacteristicsPage {
  characteristicsTab = element(by.css('.ft-characteristic'));
  characteristicCard = element(by.tagName('app-characteristic-name'));
  characteristicCardByXpath = element.all(by.className("card-title")).all(by.xpath("//app-characteristic-name/label"));
  characteristicCardByXpath2 = element(by.xpath("//div[@class='card-title']/app-characteristic-name/label[contains(text(),'chNumber')]"));
  characteristicSlider = element(by.css('.cui-slider-horizontal'));
  characteristicValueSlider = element(by.css("div.info-item:nth-child(2) > span:nth-child(2)"));
  characteristicIntegerField = element(by.css("input.ng-pristine"));
  divCardTitleClass = ".card-title";
  divCardTitles = element.all(by.css(this.divCardTitleClass));
  divCardTitlesLabelClass = '.card-title label';
  divCardTitlesLabel = element.all(by.css(this.divCardTitlesLabelClass));
  progressIconClass = ".progress-icon";
  progressSpinnerClass = ".progress-spinner";
  progressSuccessClass = ".progress-success";
  smallIconCalendar = element(by.css(".small.icon-calendar-clock"));
  applyButton = element(by.css(".primary.cui-button"));
  fakePlaceholder = element(by.css(".fake-placeholder"));
  lever = element(by.css('.lever'));
  dynamicDropdown = element(by.css('.dynamic-dropdown-content.overlay-component'));
  boxSuggestionsFirstOption = element(by.css('.box-suggestions ul li'));
  tagTexts = element.all(by.css('.tag-text'));
  multiSelectorFilter = element(by.css('.filter-actions input'));
  highlightedOption = element(by.css('.highlighted'));
  optionValues = element.all(by.xpath("//div[@class='cui-action-menu-wrapper overlay-component']/ul[@class='cui-action-menu-ul']/cui-action-menu-item/span"));
  unsetMessageClass = '.unset-message';
  suggestedOption = element(by.css('.suggested-option'));
  sequenceInput = element(by.css('.sequence-content .field-group .ng-valid.cui-input'));
  setSequencePopUpClass = '.ng-trigger-fadeInOut';
  setSequencePopUp = element(by.css(this.setSequencePopUpClass));
  propertiesInputHandler = element(by.xpath("//input[@placeholder='Search']"));
  ftMoreInfoID = element(by.css('.ft-more-info-ID'));
  ftMoreInfoValue = element(by.css('.ft-more-info-Value'));
  characteristicTextTagName = 'app-characteristic-value div div app-text-handler div input';
  characteristicTagTagName = 'app-characteristic-value div div app-tag-handler div';
  characteristicStringInputClass = '.text-handler input';
  characteristicNumberTagNameClass = '.number-handler input';
  containerAppAutocompleteTagName = '.container-autocomplete app-custom-autocomplete div span input';
  characteristicComboboxTagName = 'app-characteristic-value div div app-combobox-handler div app-custom-dynamic-select input';
  characteristicSliderTagName = 'app-characteristic-value div div app-slider-handler div app-custom-slider section div cui-slider div div';
  characteristicDateTimeTagName = 'app-characteristic-value div div app-date-handler div cui-date-time-input div input';
  characteristicOrderGroupLabels= element.all(by.css('.ft-order .card-title label'));
  orderCaptureOptions = element.all(by.css('.order-capture-content li'));
  minMaxArrayCharacClass = '.ft-min-max-wrap';
  formulaMessage = element(by.css('.formula-message'));
  clearValueText = 'Clear value';
  moreInformationText = 'More Information';
  propertiesText = 'Properties';
  setSequenceText = 'Set Sequence';
  thisMonthClass = '.this-month';
  hourSlider = element.all(by.css('.time-wrapper .cui-slider-wrapper')).get(0);
  minutesSlider = element.all(by.css('.time-wrapper .cui-slider-wrapper')).get(1);
  sliderClass = '.cui-slider-wrapper';
  defaultSliderValue = element.all(by.css('.info-value')).get(1);
  popOverClass = '.ft-popover';
  popOverInput = element.all(by.css('.ft-popover input'));
  closePopOver = element(by.css('.ft-close-icon'));
  familyBox = element(by.css('.ft-family input'));
  productTypeBox = element(by.css('.ft-product-type input'));
  subTypeBox = element(by.css('.ft-product-subtype input'));
  salesTypeBox = element(by.css('.ft-sales input'));
  characteristicTitleField = 'app-characteristic-name label';
  characteristicTextValueField = 'app-characteristic-value div div app-text-handler div input';
  characteristicNumberValueField = 'app-characteristic-value div div app-number-handler div input';
  primaryButton = element(by.css(".primary.cui-button"));
  characteristicDateValueField = 'app-characteristic-value div div app-date-handler div input';
  characteristicDefaultSliderValue = element.all(by.css('.info-value')).get(1);
  regexError = element(by.css('.error-text'));
  dropDownListContent = element.all(by.css('.dropdown-content .content'));
  hourBox = element(by.css('.ft-date-assign-end-time input'));
  groupLabel = element.all(by.css('.characteristic-group .ng-star-inserted .ng-star-inserted label'));
  errorMessageClass = '.error p';
  errorMessage = element(by.css(this.errorMessageClass));

  async getCardByValue(LabelValue: string){
     return  element(by.css("div.field-group > input[value='"+LabelValue+"')]"));
  }

  async getCardByValueStatus(changed: boolean){
    if(!changed){
      return element(by.css("input.ng-untouched"));
    }else{
      return element(by.css("input.ng-touched"));
    }
  }

  async getDayMonth(day: number) {
    return element.all(by.css(this.thisMonthClass)).get(day - 1);
  }

  async getMoreInfoElement(label: string) {
    return element(by.css('.ft-more-info-' + await label.split(" ")[0]))
  }
}