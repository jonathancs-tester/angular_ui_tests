/**
 * Creation Date: 29/06/2018
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { browser, element, by } from 'protractor';

export class LoginPage {
  user = element(by.css('.ft-user'));
  password = element(by.css('.ft-password'));
  loginButton = element(by.css('.ft-submit'));
  validationMessage = element(by.id('error-message'));
  async OpenBrowser(url: string) {
    await browser.get(url);
  }
}
