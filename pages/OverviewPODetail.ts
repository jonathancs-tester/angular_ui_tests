/**
 * Creation Date: 06/08/2018
 * Author: Jéssica Souza Pivoto
 *         Christopher Lima
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class OverviewPODetailPage {
  browseButton = element.all(by.css('ul.ng-star-inserted > li:nth-child(1) > span:nth-child(1)')).first();
  cardSearchResult = element.all(by.css('.ft-card-title')).first();
  closeMessageActivate = element(by.css('.close'));
  activateButton = element(by.css('.ft-button-activate'));
  activePoDialogClass = '.custom-dialog-wrapper';
  activePoDialogs = element.all(by.css(this.activePoDialogClass));
  activateButtonDialog = element(by.css('.primary.ft-activate-request.cui-button'));
  warningMessageActivate = element(by.css('.cui-snack-bar'));
  activeIconOverviewPage = element(by.css('.ng-trigger-showState'));
  projectName = element(by.css('.name'));
  projectDescription = element(by.css('.description'));
  progressSuccessClass = '.progress-success';
  poName = element(by.css('.ft-info-card-name'));
  poProjStatus = element(by.css('.ng-trigger-showState span'));
}
