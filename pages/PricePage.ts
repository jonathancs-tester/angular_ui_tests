/**
 * Creation Date: 28/08/2018
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class PricePage {
  priceTab = element(by.css('.ft-price'));
  addPrice = element(by.css('.ft-ADD'));
  openDrawer = element(by.css('.ft-open-drawer-card'));
  searchPrice = element(by.id('nodeSearch'));
  kickPriceClass = '.ft-kick-action';
  kickPrice = element(by.css(this.kickPriceClass));
  priceValueClass = '.ft-price-value';
  priceValue = element(by.css(this.priceValueClass));
  priceValues = element.all(by.css(this.priceValueClass));
  doneButtonClass = '.ft-DONE';
  doneButton = element(by.css(this.doneButtonClass));
  emptyPriceCardNoPriceLabel = element(by.css('.text label b'));
  priceCardNameClass = '.name';
  priceCardName = element(by.css(this.priceCardNameClass));
  priceCardNames = element.all(by.css(this.priceCardNameClass));
  ctRecurringType = element(by.css('.ft-root-RECURRING'));
  ctOneTimeType = element(by.css('.ft-root-ONE_TIME'));
  ctUsageType = element(by.css('.ft-root-USAGE'));
  ctDiscountRecurring = element(by.css('.ft-root-DISCOUNT_RECURRING'));
  ctDiscountOneTime = element(by.css('.ft-root-DISCOUNT_ONE_TIME'));
  ctDiscountUsage = element(by.css('.ft-root-DISCOUNT_USAGE'));
  iconMoreClass = '.icon-more';
  priceCardMore = element(by.css(this.iconMoreClass));
  priceCardMoreLast = element.all(by.css(this.iconMoreClass)).last();
  deletePrice = element(by.css('.cui-action-menu-item.cui-action-menu-item:nth-child(2)'));
  priceCardValueClass = '.price-value';
  priceCardValue = element(by.css(this.priceCardValueClass));
  confirmationDeleteClass = '.ft-action-dialog-confirm';
  confirmationDelete = element(by.css(this.confirmationDeleteClass));
  cancelDelete = element(by.css('.ft-action-dialog-cancel'));
  deletePriceForm = element(by.css('.ft-DELETE'));
  arrowCharSingleSelector = element(by.css(".ng-touched.>.cui-icon:nth-child(1)"));
  value12Months = element(by.css(".div.options:nth-child(1) > ul:nth-child(2) > cui-option:nth-child(2) > li:nth-child(1) > span:nth-child(1) > div:nth-child(1)"));
  priceName = element(by.css(".ft-price-name"));
  tagGroupClass = ".tag-text";
  tagGroup = element(by.css(this.tagGroupClass));
  tagGroups = element.all(by.css(this.tagGroupClass));
  progressIconClass = ".progress-icon";
  messageDeleteWithDiscClass = ".cui-snack-bar";
  messageDeleteWithDisc = element(by.css(this.messageDeleteWithDiscClass));
  openPriceCardClass = '.price-info.ng-star-inserted'
  openPriceCard = element(by.css(this.openPriceCardClass));
  priceInfo = element(by.css(".price-info"));
  classCardTitle = '.ft-drawer-card-title';
  noItemsFound = element(by.css('.no-items-found'));
  overridePriceInfo = element(by.css('.below-content-text'));
  addDiscountButton = element(by.css('.ft-discount'));
  globalPriceListIconMore = element(by.css('.ft-global-action-menu .icon-more'));
  mdrTableClass = '.ft-mdr-table-row';
  mdrColumnClass = '.ft-mdr-column';
  mdrTables = element.all(by.css(this.mdrTableClass));
  mdrLastTable = element.all(by.css(this.mdrTableClass)).last();
  mdrFirstTable = element.all(by.css(this.mdrTableClass)).first();
  mdrLastColumns = element.all(by.css(this.mdrColumnClass)).last();
  priceListOptionClass = '.input-handler';
  priceListSuggestedOptionClass = '.suggested-option';
  priceListSuggestedOption = element(by.css(this.priceListSuggestedOptionClass));
  mdrPriceCardPriceListClass = '.mdr-price-card-container';
  columnDrawerHeaderClass = '.column-drawer-header';
  chipsXButton = element.all(by.css('.chip .material-icons'));
  lastChipXButton = element.all(by.css('.chip .material-icons')).last();
  chipClass = '.chip span';
  chips = element.all(by.css(this.chipClass));
  mdrCardValuesClass = '.ft-mdr-card-value';
  mdrCardValue = element(by.css(this.mdrCardValuesClass));
  mdrCardValues = element.all(by.css(this.mdrCardValuesClass));
  priceListTableHeader = element.all(by.css('.ft-mdr-table-header div'));
  priceListSearchAddValueClass = '.ft-nodeSearch';
  priceListSearchAddValue = element(by.css(this.priceListSearchAddValueClass));
  kickerClass = '.kicker';
  kicker = element(by.css(this.kickerClass));
  errorMessage = element(by.css('.ng-trigger-visibility.error p'));
  minimumPriceValueClass = '.minimum-price-value';
  minimumPriceValue = element(by.css(this.minimumPriceValueClass));
  allDimensionsClass = '.all-dimensions';
  cuiActionMenuItemClass = '.cui-action-menu-item';
  disabledClass = 'disabled';
  priceCardContainerValueClass = '.price-card-container';
  priceCardsContainerValue = element.all(by.css(this.priceCardContainerValueClass));
  cardContentClass = '.ft-card-content';
  cardContent = element(by.css(this.cardContentClass));
  mdrfilterClass = '.ft-mdr-filter';
  mdrfilters = element.all(by.css(this.mdrfilterClass));
  droppableCardClass = '.droppable-card';
  droppableCard = element(by.css(this.droppableCardClass));
  droppableCardText = element(by.css('.ft-droppable-card .ng-star-inserted'));
  draggableElement = element(by.css('.is-draggable'));
  ruleCardClass = '.ft-rule-card';
  ruleCardName = element(by.css('.ft-rule-card .name'));
  ruleIconMore = element(by.css('.ft-rule-card .icon-more'));
  divCardTitleClass = ".card-title";
  divCardTitles = element.all(by.css(this.divCardTitleClass));
  expandedContainer = element.all(by.css('.expanded-container'));
  panelsTitle = element.all(by.css('.panel-title'));
  arrowRight = element(by.css('.arrow.right'));
  moreInfoId = element(by.css('.ft-more-info-Id'));
  moreInfoPrice = element(by.css('.ft-more-info-Price'));
  moreInfoExternal = element(by.css('.ft-more-info-EXTERNAL'));
  moreInfoChange = element(by.css('.ft-more-info-Change'));
  moreInfoFormula = element(by.css('.ft-more-info-Pricing'));
  mandatoryDialogClass = 'mandatory ng-star-inserted';
  offerDisc = element(by.css('.ft-offer-target'));
  appliesTo = element(by.css('.for-discount-offer'));
  priceToReceiveDisc = element(by.css('.name.inline-edit'));
  badgeDisc = function (popID) {
    return element.all(by.css(`.below-content.popover-${popID} span span`)).get(1);
  }
  belowContentText = element.all(by.css('.below-content-text')).get(0);
}
