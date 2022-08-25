/**
 * Creation Date: 08/01/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

//For this API works the startDateTime must be the same of the po date including the seconds.
import { config } from '../steps/config';
let axios = require('axios');

export class UpdatePOWithRuleJS {
  async performPatch(
    basicPoId: string,
    ruleId: string, 
    projectId: string,
    date: Date,
    user: string,
    pass: string
  ) {
    try {     
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + basicPoId,
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
          "id": basicPoId,
          "versions": [{
            "id": basicPoId,
            "validFor": {
              "startDateTime": date,
            },
            "baseEntityId": "base_ProductOffering",
            "specificationType": "ProductOffering",
            "rules": {
              "id": ruleId,
              "type": "validation",
              "name": ruleId,
              "ruleLanguage": "42S",
              "ruleType": "validation",
              "sequence": "-",
              "rule": {
                "id": ruleId
              }
            }
          }
        ],
        },
      });
      return axios;
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
