/**
 * Creation Date: 03/09/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class DescriptionPage {
  descriptionTab = element(by.css('.ft-description'));
  addANewDescription = element(by.css('.ft-ADD'));
  descriptionTypeOption = element(by.css('#category > cui-icon:nth-child(1)'));
  descriptionTypeLabel = element(by.cssContainingText('.cui-option','Label'));
  descriptionTypeDescription = element(by.cssContainingText('.cui-option','Description'));
  inputDescription = element(by.id('description'));
  doneButton = element(by.css('.ft-DONE'));
  descriptionTextClass = '.text-format';
  descriptionText = element(by.css(this.descriptionTextClass));
  tagInput = element(by.css('.input-handler'));
  suggestedOptionTag = element(by.css('.suggested-option'));
  countTag = element(by.css('cui-state-badge:nth-child(1) > span'));
  applyedTag = element(by.css('.tag-text'));
  cardMoreOption = element(by.css('.icon-more'));
  editDescription = element(by.css('.selected > span:nth-child(1)'));
  deleteDescription = element(by.css('cui-action-menu-item.cui-action-menu-item:nth-child(2) > span:nth-child(1)'));
  confirmMessageDelete = element(by.css('.ft-action-dialog-confirm'));
  descriptionCardHeader = element(by.css('.description-card-header'));
  removeTag = element(by.css('app-custom-tag.ng-star-inserted:nth-child(1) > div:nth-child(1) > span:nth-child(2) > i:nth-child(1)'));
  editableField = element(by.css('.text-format.editable-field'));
  editableText = element(by.css('.description-textarea'));
  noResultsDescription = element(by.css('.no-results.ng-star-inserted'));
  disableButtonDelete = element(by.css('cui-action-menu-item.disabled:nth-child(2) > span:nth-child(1)'));
  openCard = element(by.css('div.cui-action-menu-wrapper:nth-child(1) > ul:nth-child(1) > cui-action-menu-item:nth-child(1)'));
  checkUpdated = element(by.css('.progress-placeholder'));
  activeTab = element(by.css('.cui-tab-active'));
  progressIconClass = '.progress-icon';
}
