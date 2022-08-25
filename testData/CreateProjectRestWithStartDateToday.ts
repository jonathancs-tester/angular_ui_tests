/**
 * Creation Date: 29/11/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
import { Helper } from '../Utils/Helpers/Helper';
let axios = require('axios');

var helper = new Helper();

export class CreateProjectRestWithStartDateToday {
  async performPost(projectId: string, user: string, pass: string) {
    try {
      let date = await helper.getEffectiveDateAddHours(+2);
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project',
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          id: projectId,
          name: projectId + 'Name',
          effectiveDate: date,
          state: 'DEF',
          description: projectId + 'Description',
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
