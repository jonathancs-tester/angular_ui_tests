/**
 * Creation Date: 12/08/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

//For this API works the startDateTime must be the same of the po date including the seconds.
import { config } from '../steps/config';
let axios = require('axios');

export class UpdatePOWithRuleRelation {
  async performPatch(
    poId,
    projectId,
    poDate,
    ruleType,
    ruleID,
    relationID,
    user,
    pass
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + poId,
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
          "id": poId,
          "versions": [
            {
              "id": poId,
              "validFor": {
                "startDateTime": poDate
              },
              "rules": [
                {
                  "id": relationID,
                  "type": ruleType,
                  "name": ruleID,
                  "ruleType": ruleType,
                  "sequence": "-",
                  "rule": {
                    "id": ruleID
                  }
                }
              ]
            }
          ]
        },
      });
      return axios;
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
