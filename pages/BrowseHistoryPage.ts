/**
 * Creation Date: 29/06/2018
 * Author: Wanderson Clemente
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class BrowserHistoryPage {
  MEview = element(by.css('.ft-root-ME'));
  everyoneView = element(by.css('.ft-root-EVERYONE'));
  today = element(by.xpath('//div[contains(text(),"Today")]'));
  yesterday = element(by.xpath('//div[contains(text(),"Yesterday")]'));
  thisWeek = element(by.xpath('//div[contains(text(),"This Week")]'));
  thisMonth = element(by.xpath('//div[contains(text(),"This Month")]'));
  thisQuarter = element(by.xpath('//div[contains(text(),"This Quarter")]'));
  hisYear = element(by.xpath('//div[contains(text(),"This Year")]'));
  noResults = element(by.css('.no-result'));
  entityName = element(by.css('td.ng-tns-c42-30:nth-child(2) > cui-table-cell-default:nth-child(1) > div:nth-child(1)'));
}
