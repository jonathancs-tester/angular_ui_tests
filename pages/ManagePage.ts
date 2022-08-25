/**
 * Creation Date: 25/02/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class ManagePage {
  manageButton = element(by.css('.ng-star-inserted cui-tab-active')); 
  deviceIcon = element(by.css('.ft-device'));
  searchField = element(by.css('.ft-input-search'));
  poDeviceNameclass = '.ft-row-name';
  poDeviceName = element(by.css(this.poDeviceNameclass));
  poDeviceNames = element.all(by.css(this.poDeviceNameclass));
  actionContainer = element(by.css('.primary.inverted.cui-multi-button'));
  stateButton = element(by.css('.status-project .cui-state-badge'));
  readOnlyStateButton = element(by.css('.readonly-permission .cui-state-badge'));
  stateApprovalButton = element(by.css('img[src="./assets/lifecycle-svgs/readyforapproval.svg"]'));
  stateDeploymentButton = element(by.css('img[src="./assets/lifecycle-svgs/readyforlaunch.svg"]'));
  stateActivateButton = element(by.css('img[src="./assets/lifecycle-svgs/active.svg"]'));
  infoPanelClass = '.panel-info.inline';
  ftNonTransitionalClass = '.ft-non-transitional';
  customDialogClass = '.custom-dialog-wrapper';
  confirmButtonDialogDeployment = element(by.css('.confirm.ft-action-dialog-confirm.cui-button'));
  closeButtonDialogDeployment = element(by.css('.close.ft-action-dialog-close.cui-button'));
  dialogBody = '.dialog-body';
  infoPanel = element(by.css(this.infoPanelClass));
  timeContainer = element(by.css('.date-time-container .time-container'));
  deploymentCustomHeaderBody = element(by.css('.content-holder .screen.confirmation.ng-trigger.ng-trigger-showContent'));
  warningCustomHeaderBody = element(by.css('.screen.result.ft-action-dialog-result.ng-trigger.ng-trigger-showContent'));
  manageSpinner = element(by.css('.progress-spinner.ng-star-inserted'));
  resultTitleActivationClass = '.result-title';
  resultTitleActivation = element(by.css(this.resultTitleActivationClass));
  disabledButton = element(by.css('.disabled.cui-action-menu-item'));
  ellipsisActionMenu = element(by.css('.action-menu.ellipsis-icon.cui-action-menu'));
  editOptionValues = element.all(by.css('.cui-action-menu-wrapper.overlay-component'));
  dateInput = element(by.css('.ft-date-assign-start-date'));
  timeInput = element(by.css('.field-group input'));
  changeDateAdvancedOption = element(by.css('.panel-toggler'));
  changeDateButton = element(by.css('.primary.ft-create.cui-button'));
  projectLaunchDate = element(by.css('.data-project .value'));
  offerTableRows = element.all(by.css('.cui-table-row'));
  offerTableLaunchDate = element(by.css('.cui-table-row td:nth-child(4)'));
  offerTableEndDate = element(by.css('.cui-table-row td:nth-child(5)'));
  offerBackDateSwitch = element(by.cssContainingText('label', 'Back dating of offers')).element(by.xpath('following-sibling::div')).element(by.css('cui-switcher'));
  offerLaunchDateSwitch = element(by.cssContainingText('label', 'Offer Launch Date')).element(by.xpath('following-sibling::div')).element(by.css('cui-switcher'));
  offerEndDateSwitch = element(by.cssContainingText('label', 'Offer End Date')).element(by.xpath('following-sibling::div')).element(by.css('cui-switcher'));
  progressSpinnerClass = '.progress-spinner';
  progressIconClass = '.progress-icon';
  errorMessageClass = '.error p';
  errorMessage = element(by.css(this.errorMessageClass));
  snackBarErrorMessage = element(by.css('.cui-snack-bar div p'));
  snackBarValidateMessage = element(by.css('.cui-snack-bar p'));
  projectAction = element(by.css('.multi-button-dropdown-input'));
  projectActionOptionsClass = '.multi-button-dropdown-content .content';
  projectActionOptions = element.all(by.css(this.projectActionOptionsClass));
  projectNameClass = '.name';
  projectName = element(by.css(this.projectNameClass));
  projectDescription = element(by.css('.description'));
  workingRequestClass = '.scope-label';
  workingRequest = element(by.css(this.workingRequestClass));
}
