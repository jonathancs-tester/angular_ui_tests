/**
 * Creation Date: 08/01/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class CreateOfferPage {
  nameOffer = element(by.id('name'));
  descriptionOffer = element(by.id('description'));
  launchDateOffer = element(by.css('.ft-project-assign-start-date'));
  // launchTimeOffer = element(by.className(''));
  launchTimeIcon = element(by.css('.icon-clock'));
  expiryDate = element(by.css('#endDate'));
  calendarButton = element(by.css('.mat-icon-button'));
  calendarPeriodButton = element(by.css('.mat-calendar-period-button')); 
  currentYearCalendar = element(by.css('.mat-calendar-body-selected'));
  currentDateCalendar = element(by.css('#startDate > div:nth-child(1) > cui-date-time-picker:nth-child(4) > cui-icon'));
  lastMonthCalendar = element(by.css('.mat-calendar-previous-button'));
  nextMonthCalendar = element(by.css('.mat-calendar-next-button'));
  daySelectCalendar = element(by.css('tr.ng-star-inserted:nth-child(5) > td:nth-child(4) > div:nth-child(1)'));
  applyLaunchTime = element(by.css('button.ng-star-inserted:nth-child(2)'));
  sliderToHour = element(by.css('cui-slider.cui-slider:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)'));
  saveButtonClass = '.ft-save';
  saveButton = element(by.css(this.saveButtonClass));
  copyButton = element(by.css('.ft-create'));
  cancelNewVersionButton = element(by.css('.ht-close'));
  cancelCreateButton = element(by.css('.ft-cancel'));
  closeButton = element(by.css('.ht-close'));
  createPO = element(by.css('.ft-create')); 
  createPOClass = '.ft-create'; 
  alertPastDate = element(by.css('.error-text'));
  newVersionModal = element(by.css('.custom-dialog-wrapper'));
  projectName = element(by.id("txtProject"));
  calendarDayClass = ".mat-calendar-body-cell";
  day = element(by.css(this.calendarDayClass));
  day11 = element(by.css('tr.ng-star-inserted:nth-child(3) > td:nth-child(3) > div:nth-child(1)'));
  lastDay = element.all(by.css(this.calendarDayClass)).last();
  backdropClass = ".cui-backdrop";
  requestNameInput = element(by.css('.project.cui-input'))
}
