/**
 * Creation Date: 31/07/2018
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class MainPage {
  createButtonPO = element(by.css('li.ng-star-inserted:nth-child(3) > span:nth-child(1)'));
  browse = element(by.css('li.ng-star-inserted:nth-child(2) > span:nth-child(1)'));
  manage = element(by.css('li.ng-star-inserted:nth-child(1) > span:nth-child(1) > a:nth-child(1)'));
  buttonSelect = element(by.css('.panel-title'));
  entitySelectClass = 'ft-category-Entity';
  entity = element(by.css(`.${this.entitySelectClass}`));
  goBackButtonClass = '.go-back-btn';
  goBackButton = element(by.css(this.goBackButtonClass));
  entitySearchClass = '.ft-searchField';
  entitySearch = element(by.css(this.entitySearchClass));
  noResults = element(by.css('.no-result'));
  browserButton = element(by.css('.ng-star-inserted.cui-tab-active'));
  dropDown = element(by.css('.ft-browse-dropdown'));
  categoryClass ='.active .panel-content .ft-category-Category';
  category = element(by.css(this.categoryClass));
  browseHistory = element(by.css('.ft-category-History'));
  PO = element(by.css('.ft-root-Offers'));
  PS = element(by.css('.ft-root-Specifications'));
  PSClass = '.ft-root-Specifications';
  POCard = element(by.css('.card-content'));
  POCreatedCard = element(by.css('.node-title'));
  PORectangleCardMoreOptions = element(by.css('.ft-browse-card .icon-more'));
  cardMoreOptionsClass = '.icon-more';
  cardMoreOptions = element(by.css(this.cardMoreOptionsClass));
  cardMoreOptionRowClass = '.ft-mdr-table-row .icon-more'
  cardMoreOptionRow = element(by.css(this.cardMoreOptionRowClass));
  cardsMoreOptionRow = element.all(by.css(this.cardMoreOptionRowClass));
  moreOptionList = element(by.css('.cui-action-menu .icon-more'));
  cardOptionOpen = element(by.css('.block-action-menu cui-action-menu'));
  cardWrapper = element(by.css('.ft-cards'));
  browseCard = element(by.css('app-browse-card'));
  logoutButton = element(by.css('cui-action-menu.cui-action-menu:nth-child(2)'));
  signOutOption = element(by.css('.ng-star-inserted > span:nth-child(1)'));
  signOutConfirm = element(by.css('.ft-signout-modal-button'));
  rootEntity = element(by.css('.root-entity'));
  descriptionOverviewEdit = element(by.css('.ft-info-card-description'));
  nameOverviewEdit = element(by.css('h3.editable-field'));
  activeTab = element(by.css('.cui-tab-active'));
  copyAction = element(by.cssContainingText('.cui-action-menu-item', 'Copy'));
  moreOptionActionClass = '.cui-action-menu-item'
  moreOptionAction = element.all(by.css(this.moreOptionActionClass));
  searchRequests = element(by.css('.ft-input-search'));
  createDateProject = element(by.css('div.box-info-date:nth-child(1) > span:nth-child(2)'));
  projectNameResponseClass = '.ft-row-name';
  projectNameResponse = element(by.css(this.projectNameResponseClass));
  progressIconClass = '.progress-icon';
  progressClass = '.progress';
  viewOptionsClass = '.ft-browse-dropdown';
  viewOptions = element(by.css(this.viewOptionsClass));
  cardTitleClass = '.ft-card-title';
  cardListClass = '.default-cell';
  cardList = element(by.css(this.cardListClass));
  cardLists = element.all(by.css(this.cardListClass));
  cardDrawerTitle = element.all(by.css('.ft-drawer-card-title'));
  resultCardPO = element(by.css(this.cardTitleClass));
  graphicalOptions = element(by.css('.ft-views-view_stream'));
  listOption = element(by.css('.ft-views-view_list'));
  graphicalClass = '.graphical-wrapper';
  graphicalCards = element.all(by.css(this.graphicalClass));
  detailOptions = element(by.css('.ft-views-view_module'));
  card = element(by.css('.ft-graphical-card'));
  nameCardClass = '.ft-info-card-name';
  nameCard = element(by.css(this.nameCardClass));
  stateBadgeClass = '.cui-state-badge span';
  stateBadge = element(by.css(this.stateBadgeClass));
  stateBadges = element.all(by.css(this.stateBadgeClass));
  tableHeaders = element.all(by.css('.sorting span'));
  columnIcons = element.all(by.css('.select-columns-icon.icon-more'));
  optionsSelect = element.all(by.css('.selected .content'));
  hiddenColumnClass = '.hidden-column .sorting span';
  hiddenColumn = element.all(by.css(this.hiddenColumnClass));
  browseCardClass = '.ft-browse-card';
  categoryPathClass = '.cui-breadcrumb span';
  categoryPaths = element.all(by.css(this.categoryPathClass));
  progressBarProgressClass = '.progress-bar.progress';
  progressBarClass = '.progress-bar';
  cuiTableRowClass = '.cui-table-row';
  paginationChoose = element(by.css('.pagination-wrapper select'));
  stateStatusClass = '.table-row.ng-star-inserted span';
  statesStatus = element.all(by.css(this.stateStatusClass));
  tableRows = element.all(by.css(this.cuiTableRowClass));
  rowRangeDescription = element(by.css('.current'));
  nextPaginationIcon = element(by.css('.next.icon-chevron-down'));
  paginationOptions = element.all(by.css('.pagination-wrapper select option'));
  arrowsAscending = element.all(by.css(".icon-arrow-up"));
  arrowsDescending = element.all(by.css(".icon-arrow-down"));
  projectScope = element(by.css('.ft-project-scope'));
  scopeLabel = element(by.css('.scope-label'));
  dataElipsisLeft = element(by.css('.data-ellipsis-left'));
  clearSearchButton = element(by.css('.clear-search'));
  projectListColumnsClass = '.cui-table-row td';
  projectListColumns = element.all(by.css(this.projectListColumnsClass));
  recentOfferTab = element(by.css('.ft-offer-tab'));
  newRequestButtonClass = '.ft-new-request';
  newRequestButton = element(by.css(this.newRequestButtonClass));
  primaryButtonClass = '.primary';
  primaryButtons = element.all(by.css(this.primaryButtonClass));
  dialogWrapperClass = '.custom-dialog-wrapper';
  projectName = element(by.id('name'));
  projectDescription = element(by.id('description'));
  projectDate = element(by.css('.ft-date-assign-start-date'));
  projectHour = element(by.css('.ft-date-assign-start-time input'));

  async getRootLevelCategory(categoryId: string) {
    return element(by.css('.ft-root-' + categoryId));
  }
}
