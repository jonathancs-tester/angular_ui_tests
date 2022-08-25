/**
 * Creation Date: 27/08/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class RulePage {
  ruleTab = element(by.css('.ft-rule'));
  toAssignRuleCard = element(by.cssContainingText('.text', 'Click here to assign a rule'));
  drawerSearch = element(by.id('nodeSearch'));
  kickRuleClass = '.ft-kick-action';
  kickRule = element(by.css(this.kickRuleClass));
  ruleTypeOptions = element(by.css('#ruleType > cui-icon:nth-child(1)'));
  ruleTypeValidation = element(by.css('ul.options:nth-child(1) > cui-option:nth-child(2) > li:nth-child(1) > span:nth-child(1) > span:nth-child(2)'));
  ruleTypeAvailability = element(by.css('ul.options:nth-child(1) > cui-option:nth-child(3) > li:nth-child(1) > span:nth-child(1) > span:nth-child(2)'));
  ruleTypeEligibility = element(by.css('cui-option.cui-option:nth-child(4) > li:nth-child(1) > span:nth-child(1) > span:nth-child(2)')); 
  addRuleDone = element(by.css('.ft-DONE'));
  ruleCard = element(by.css('.name'));
  cardMoreOptions = element(by.css('.action-menu > cui-icon:nth-child(1)'));
  openCardRule = element(by.css('div.cui-action-menu-wrapper:nth-child(1) > ul:nth-child(1) > cui-action-menu-item:nth-child(1) > span:nth-child(1)'));
  deleteRule = element(by.css('cui-action-menu-item.cui-action-menu-item:nth-child(2) > span:nth-child(1)'));
  modalConfirmDeleteRule = element(by.css('.ft-action-dialog-confirm'));
  noRulesFound = element(by.css('.text b'));
  ruleType =  element(by.css('.select-dropdown-input'));
  code = element(by.css('.code'));
  addRule = element(by.css('.workspace-label'));
  cardTitle = element(by.css('.ft-drawer-card-title'));
  containerClass = 'ft-card-container';
  dialogWraper = 'mandatory';
  dialogWraperClass = '.' + this.dialogWraper;
}
