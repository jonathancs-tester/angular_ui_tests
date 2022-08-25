/**
 * Creation Date: 30/06/2018
 * Author: Andreivan P. dos Santos
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

export class CreateChargeTypeM_V2 {
  async performPost(
    ctId: String,
    projectId: String,
    user: string,
    pass: string,
    ctValue: number
  ) {
    try {
      let date = await helper.getDateCT(-1);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl + '/ecm/ecm/CatalogManagement/v2/priceSpecification',
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
          
            "id": ctId,
            
            "versions": [{
              "id": ctId,
              "name": ctId,
              "state": "DEF",
              "validFor": {
                "startDateTime": "2015-07-03T04:00:00.000Z"
              },
              "popsType": "CHAG",
              "frequency": "O",
              "price": {
                "amount": 100,
                "units": {
                  "code": "CAD",
                  "name": "Canada, Dollars"
                }
              },
              "pricingType": "FR",
              "discountDetails": {},
              "displayOnly": false,
              "taxes": {},
              "external": false,
              "characteristics": [
          
          
              ],
              "translations": [{
                "fieldname": "name",
                "translation": [{
                  "text": "Carrier Ethernet One Time Charge",
                  "language": "en-xx"
                }]
              }],
              "baseSpecificationId": {}
            }]
          }
        ,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
