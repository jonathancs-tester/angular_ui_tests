/**
 * Creation Date: 16/01/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class CreateCategoryWithParentRest {
  async performPost(
    projectId: String,
    date: Date,
    user: string,
    pass: string,
    categoryId: string,
    categoryName: string,
    parentCategoryId: string
  ) {
    try {
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productCategory',
        headers: {
          'content-type': 'application/json',
        },
        params: {
          project: projectId,
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          id: categoryId,
          name: categoryName,
          parentCategoryId: parentCategoryId,
          validFor: {
            startDateTime: date
          },
          state: 'DEF'
        },
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
