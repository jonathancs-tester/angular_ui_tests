/**
 * Creation Date: 29/06/2018
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import {element, by } from 'protractor';

export class LoadingPage {
  loaderClass = '.loader-container';
  loader = element(by.css(this.loaderClass));
  loaderNg = element(by.css('.loader-container.ng-star-inserted'));
  nodeClass = '.node-rectangle';
  node = element(by.css(this.nodeClass));
  progressIcon = element(by.css(".progress-icon"));
  detailLoader = element(by.css(".app-loader .ng-star-inserted"));
}
