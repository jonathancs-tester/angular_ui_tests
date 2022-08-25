/**
 * Creation Date: 24/08/2018
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

export class CreateRuleTypeCRRest {
  async performPost(
    projectId: string,
    ruleId: string,
    user: string,
    pass: string
  ) {
    try {
      let date = await helper.getDateCT(-1);
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/rule/',
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
          id: ruleId,
          versions: [
            {
              id: ruleId,
              returnType: 'B',
              implementationType: 'CR',
              name: ruleId,
              ruleScript: 'if theContext is not null and theContext.Configurable is not null and theContext.Configurable == false    return true else     return false end if',
              project: projectId,
              state: 'DEF',
              validFor: {
                startDateTime: date,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
