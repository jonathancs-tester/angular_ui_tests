/**
 * Creation Date: 10/04/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class AddMarketRuleToPO {
  async performPost(
    projectId: string,
    date: Date,
    user: string,
    pass: string,
    POId: string
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + POId + "/",
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
          "id": POId,
          "versions": [{
            "id": POId,
            "validFor": {
              "startDateTime": date
            },
            "baseEntityId": "base_ProductOffering",
            "specificationType": "ProductOffering",
            "rules": [{
              "id": "wrapper_MS_" + POId,
              "name": "wrapper_MS_" + POId + " to Apply MS",
              "rule": {
                "id": "wrapper_MS_" + POId
              },
              "type": "marketSegment",
              "ruleLanguage": "CR"
            }]
          }]
        }
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
