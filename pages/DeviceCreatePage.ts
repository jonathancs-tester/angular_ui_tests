/**
 * Creation Date: 25/02/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class DeviceCreatePage {
  startDeviceDate = element(by.css('.ft-date-assign-start-date'));
  startdeviceTime = element(by.css('.ft-date-assign-start-time input'));
  projectNameTxt = element(by.id('txtProject'));
  saveDeviceCreating = element(by.css('.ft-save'));
  cancelDeviceCreating = element(by.css('.ft-close'));
  sliderMinutes = element(by.tagName('cui-slider.cui-slider:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)'));
  sliderHours = element(by.tagName('cui-slider.cui-slider:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)'));
  dropRequest = element(by.css('.ft-drop-request'));
  inputProject = element(by.css('.custom-dropdown-filter input'));
  dropDownProject = element(by.css('.ft-drop-options'));
}
