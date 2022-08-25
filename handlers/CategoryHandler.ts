/**
 * Creation Date: 16/01/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/


import { CreateCategoryRest } from '../testData/CreateCategoryRest';
import { CreateCategoryWithParentRest } from '../testData/CreateCategoryWithParentRest';
import { assignPOToProjectRest } from '../testData/assignPOToProjectRest';
import { Helper } from '../Utils/Helpers/Helper';

export class CategoryHandler {
  async createCategory(projectId: any, user: string, pass: string) {
    let category = new CreateCategoryRest();
    let start = Date.now();
    let helper = new Helper();
    let categoryId = 'Category_' + start;
    let categoryName = 'Category_' + start;
    let date = await helper.getEffectiveDate(+5);
    console.log(categoryId);
    await category.performPost(projectId, date, user, pass, categoryId, categoryName);

    return [categoryId, date];
  }

  async createCategoryWithParent(projectId: any, parentCategoryId: string, user: string, pass: string) {
    let category = new CreateCategoryWithParentRest();
    let start = Date.now();
    let helper = new Helper();
    let categoryId = 'Category_' + start;
    let categoryName = 'Category_' + start;
    let date = await helper.getEffectiveDate(+5);
    console.log(categoryId);
    await category.performPost(projectId, date, user, pass, categoryId, categoryName, parentCategoryId);

    return [categoryId, date];
  }

  async assignPOToCategory(projectId: any, poId: any, categoryId: any, user: string, pass: string) {
    let category = new assignPOToProjectRest();
    let helper = new Helper();
    let date = await helper.getEffectiveDate(+5);
    console.log(categoryId + " assigned to PO " + poId);
    await category.performPost(projectId, date, user, pass, categoryId, poId)
    return [categoryId, poId, projectId, date];
  }
}