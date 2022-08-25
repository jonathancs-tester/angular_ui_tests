/**
 * Creation Date: 09/04/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class MarketSegmentPage {
  dropCard = element(by.css('.droppable-card'));
  dropCardText = element(by.css('.text'));
  addButton = element(by.css('.ft-ADD'));
  doneButton = element(by.css('.ft-DONE'));
  errorMessageClass = '.error';
  errorMessage = element(by.css(this.errorMessageClass));
  valueTagClass = '.value-tag';
  valueTags = element.all(by.css(this.valueTagClass));
  tagParameterClass = '.show-parameters';
  tagParamenter = element(by.css(this.tagParameterClass));
  draggableMarketSegment = element(by.css('.is-draggable'));
  moreIcon = element(by.css('.icon-more'));
  moreOptionValues = element.all(by.css('.cui-action-menu-ul cui-action-menu-item span'));
  cardContainer = 'ft-card-container';
  cardContainerClass = '.' + this.cardContainer;
  kickerClass = '.kicker';
  kicker = element(by.css(this.kickerClass));
  segmentTitleClass = '.segment-title';
  segmentTitles = element.all(by.css(this.segmentTitleClass));
  nameSectionsClass = '.name-section';
  nameSections = element.all(by.css(this.nameSectionsClass));
  iconInclude = element(by.xpath('//*[@id="includes"]'));
  iconExclude = element(by.xpath('//*[@id="excludes"]'));

  async findRootRule(mdrId: string) {
    return element(by.xpath('//*[@title="' + mdrId + '"]'));
  }
}
