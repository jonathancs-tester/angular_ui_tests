/**
 * Creation Date: 18/12/2018
 * Author: Neil Martis
 * Author: Christopher Lima
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class AttachmentPage {
    attachmentNameInput = element(by.id('input-text'));
    progressSpinnerClass = ".progress-spinner";
    attachmentInlineNameClass = '.attachment-name';
    attachmentInlineName = element(by.css('.attachment-name'));
    activatePO = element(by.cssContainingText('.ft-inline-message-action', 'Activate'));
    activateCheck = element(by.css('.ft-action-dialog-confirm'));
    attachmentTab = element(by.css('.ft-attachment'));
    attachmentCard = element(by.css('.empty-card-content'));
    attachedFileNameClass = '.attachment-desc div a';
    attachedFileName = element(by.css(this.attachedFileNameClass));
    attachmentButton = element(by.xpath('//*[@id="cui-application"]/div[1]/div[2]/app-po-detail/div/div/app-workspace-panel/div/div[3]/app-attachment/div/div/app-collapsible/cui-panel/cui-panel-item/div/div[2]/div/div/div/div/div/div[2]'));
    fileFieldGroup = element(by.css('.field-group'));
    doneButton = element(by.css('.tab-actions li label'));
    cancelButton = element(by.xpath('//*[@id="cui-application"]/div[1]/div[2]/app-po-detail/div/div/app-workspace-panel/div/div[2]/ul/li[1]'));
    uploadButton = element(by.css('.cui-upload'));
    clickDonebutton = element(by.cssContainingText('i', 'done'));
    inputFile = element(by.css('input[type="file"]'));
    attachmentCardNameClass = '.content.ng-star-inserted';
    attachmentCardName = element(by.css(this.attachmentCardNameClass));
    attachmentDocumentIcon = element(by.css('.icon-undefined'));
    attachmentImageIcon = element(by.css('.image-holder'));
    uploadErrorMessageClass = '.cui-snack-bar';
    inputAttachmentOption = element(by.css('.select-dropdown-input'));
    uploadErrorMessage = element(by.css(this.uploadErrorMessageClass));
    cardContentClass = '.card-content';
    filterInput = element(by.css('.multiselect-view cui-select input'));
    filterOptions = element.all(by.css('.dropdown-content.multiple cui-option'));
    attachmentDescriptionClass = '.attachment-desc';
    attachmentDescriptionCard = element(by.css(this.attachmentDescriptionClass));
    attachmentDescription = element(by.xpath('//*[contains(@class, "attachment-desc")]/div/span'));
    attachmentDescriptions = element.all(by.xpath('//*[contains(@class, "attachment-desc")]/div/span'));
    attachmentSortInput = element(by.css('.cui-list-controller-order div cui-select input'));
    attachmentOptionValues = element.all(by.css('.options.dropdown-content.overlay-component cui-option'));
    attachmentPageSaveButtonActivePO = element(by.css('.primary.ft-save.cui-button'));
    attachmentPageActivePoDialogClass = '.custom-dialog-wrapper';
    attachmentPageActivePoDialog = element.all(by.css(this.attachmentPageActivePoDialogClass));
    attachmentFinder = element(by.css('.ft-search'));
    arrowAscendingClass = ".icon-arrow-up";
    arrowAscending = element(by.css(this.arrowAscendingClass));
    arrowsAscending = element.all(by.css(this.arrowAscendingClass));
    arrowDescendingClass = ".icon-arrow-down";
    arrowsDescending = element.all(by.css(this.arrowDescendingClass));
    attachmentPageRequiredRequestNameInDialog = element.all(by.css('.cui-input.ng-pristine'));
    attachmentAddButton = element(by.css('.tab-actions li label'));
    dotMenuButton = element(by.css('.action-menu.cui-action-menu'));
    attachmentOptionSelection = element.all(by.css('.cui-action-menu-wrapper.overlay-component ul .cui-action-menu-item'));
    editMenuCustomDialogDeleteConfirmation = element(by.css('.ft-action-dialog-confirm'));
}
