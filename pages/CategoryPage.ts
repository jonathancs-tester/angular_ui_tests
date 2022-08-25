/**
 * Creation Date: 17/01/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { element, by } from 'protractor';

export class CategoryPage {
  categoryTab = element(by.css('.ft-category'));
  searchCategory = element(by.id('searchField'));
  selectCategoryClass = '.checkbox-default.checkbox-empty';
  selectCategory = element(by.css(this.selectCategoryClass));
  selectCategoryCheckedClass = '.checkbox-default.checkbox-checked';
  selectCategoryChecked = element(by.css(this.selectCategoryCheckedClass));
  selectCategoryDotsClass = '.checkbox-default.checkbox-dots';
  checkBoxLabelClass = '.checkbox-label';
  checkBoxLabel = element(by.css(this.checkBoxLabelClass));
  checkBoxesLabel = element.all(by.css(this.checkBoxLabelClass));
  categoryTagClass = '.tag-text';
  categoryTag = element(by.css(this.categoryTagClass));
  categoryTags = element.all(by.css(this.categoryTagClass));
  categoryTagRemoveClass = '.material-icons.icon-remove';
  categoryTagRemove = element(by.css(this.categoryTagRemoveClass));
  moreIcon = element(by.css('.icon-more.cui-icon'));
  previewButtonClass = '.cui-action-menu-item.ng-star-inserted.selected';
  previewButton = element(by.css(this.previewButtonClass));
  previewPOClass = '.card-content';
  async getElementh1ByTitle (title: string) {
    return await element(by.css('h1[title=' + title + ']'));
  }
}
