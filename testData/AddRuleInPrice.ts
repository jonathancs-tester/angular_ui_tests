/**
 * Creation Date: 18/06/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class AddRuleInPrice {
  async performPost(
    projectId: string,
    poId: string,
    popId: string,
    ctId: string,
    date: Date,
    value: number,
    user: string,
    pass: string,
    popType: string,
    frequency: string,
    crId: string,
    crType: string
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + poId + '/productOfferingPrice/' + popId,
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
          "id": popId,
          "versions": [{
            "id": popId,
            "state": "DEF",
            "name": popId,
            "validFor": {
              "startDateTime": date
            },
            "popType": popType,
            "frequency": frequency,
            "plaId": ctId,
            "price": {
              "code": "USD",
              "name": "US Dollars",
              "amount": value
            },
            "conditionRules": {
              "id": crId,
              "type": crType,
              "name": crId,
              "rule": {
                "id": crId
              }
            }
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
