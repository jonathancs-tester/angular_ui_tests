/**
 * Creation Date: 01/11/2018
 * Author: Sergio Loureiro
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import {element, by } from 'protractor';

export class LogOutPage {
  logoutDropdown = element(by.css('.cui-profile-display cui-action-menu'));
  paslogoutButton = element(by.cssContainingText('.cui-action-menu-item','Sign out'));
  signOutModalButton = element(by.css('.ft-signout-modal-button'));
}
