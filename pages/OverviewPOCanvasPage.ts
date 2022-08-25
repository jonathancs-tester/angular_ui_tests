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

export class OverviewPOCanvasPage {
  canvasTabIcon = element(by.css('.tab.ft-canvas'));
  kickPSOrPOClass = '.ft-kick-action';
  kickPSOrPO = element(by.css(this.kickPSOrPOClass));
  nodeTitleClass = '.node-title';
  nodeTitle = element(by.css(this.nodeTitleClass));
  nodeTitles = element.all(by.css(this.nodeTitleClass));
  canvasTree = element(by.xpath(".//div[@id='canvasTree']"));
  trianguleGroupClass = '.polygon.triangleAdded.triangleDown';
  polygonAddedClass = '.polygonAdded';
  polygonAdded = element(by.css(this.polygonAddedClass));
  polygonsAdded = element.all(by.css(this.polygonAddedClass));
  relationshipPOAndPS = element(by.css('g.node:nth-child(3) > text:nth-child(4)'));
  PSCardName = element(by.css('g.node:nth-child(3) > text:nth-child(5)'));
  drawerSearch = element(by.id('nodeSearch'));
  cardTitleClass = '.ft-drawer-card-title'
  cardTitle = element(by.css(this.cardTitleClass));
  canvasTab = element(by.css('li.fab-btn:nth-child(2) > img:nth-child(1)'));
  containerClass = 'ft-card-container';
  addPSOrPO = element(by.css('.ft-ADD'));
  deleteButton = element(by.css('.ft-DELETE'));
  confirmDelete = element(by.css('.ft-action-dialog-confirm'));
  moreSquareClass = '.more-square';
  cardMoreOptionToRemove = element.all(by.css(this.moreSquareClass)).get(1);
  cardMoreOption = element(by.css(this.moreSquareClass));
  cardMoreOptionIconClass = '.more-icon';
  cardMoreOptionIcon = element(by.css(this.cardMoreOptionIconClass));
  cardMoreOptionsIcon = element.all(by.css(this.cardMoreOptionIconClass));
  mainGroupClass = "ft-canvas";
  textMenuRowShowClass = '.text-menu-row-show';
  textsMenuRowShow = element.all(by.css(this.textMenuRowShowClass));
  relationMoreOptions = element(by.css(':nth-child(5) > rect.more-square'));
  removePOOption = element(by.css(':nth-child(5) > text:nth-child(17)'));
  removeAddOn = element.all(by.css('.text_4.text-menu-row-show')).get(2);
  optionalForAssociation = element(by.css('g.node:nth-child(5) > text:nth-child(4)'));
  optionalForAssociationClass = '.text-association';
  cancelAssign = element(by.css('.ft-CANCEL'));
  clearInput = element(by.css('i.material-icons:nth-child(3)'));
  titleCard = element(by.css('g.node:nth-child(7) > text:nth-child(5)'));
  cardPSOrPO = element(by.css('g.node:nth-child(7) > rect:nth-child(1)'));
  menuAction = element(by.css('.ft-menu'));
  addGroup = element(by.css('.add-group'));
  groupName = element(by.css('.ft-group-name'));
  doneButton = element(by.css('.ft-DONE'));
  dropDownSelect = element(by.css('.select-dropdown-input'));
  mandatoryOption = element(by.css('.ft-MANDATORY'));
  discretionaryOption = element(by.css('.ft-DISCRETIONARY'));
  nodeSearch = element(by.css('.ft-nodeSearch'));
  containerActionsToolbarClass = 'container-actions-toolbar';
  menuOpenClass = '.menu.open';
  canvasToolBar = element(by.css(this.menuOpenClass));
  drawerCard = element(by.css('.drawer-card'));
  droppableCard = element(by.css('.droppable-card'));
  draggableContainer = element(by.css('.draggable-container'));
  cardPanelClass = 'card-panel';
  groupMax = element(by.css('.ft-group-max'));
  cardinalityCanvasClass = '.group-cardinality .cardinality0';
  minCardinalityCanvasClass = '.group-cardinality .cardinality1';
  tagContainText = element(by.css('.no-items-found span'));
  relationshipClass = '.relationship-block .select-dropdown-input';
  relationshipOptionSelectedClass = '.selected';
  relationshipInput = element(by.css('.select-dropdown-input'));
  relationshipOptionsClass = '.options.dropdown-content.overlay-component';
  progressIconClass = '.progress-icon';
  progressSpinnerClass = '.progress-spinner';
  groupTitles = element.all(by.css('.group-title'));
  ftMinClass = '.ft-min';
  ftMaxClass = '.ft-max';
  relationOpenClass = '.open';
  errorMessageClass = '.error p';
  errorMessage = element(by.css(this.errorMessageClass));
  filterList = element(by.css('.icon-select-wrapper'));
  specificationFilterOption = element(by.css('.ft-Specifications'));
  offeringFilterOption = element(by.css('.ft-Offering'));
  noItemsFound = element(by.css('.no-items-found span'));
}
