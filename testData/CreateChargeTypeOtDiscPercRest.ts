/**
 * Creation Date: 19/12/2018
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

export class CreateChargeTypeDiscRest {
  async performPost(
    CTId: String,
    percValue: number,
    projectId: String,
    user: String,
    pass: String,
    date: String,
    disFrequency = 'O'
  ) {
    try {
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
          "id": CTId,
          "versions": [
            {
              "id": CTId,
              "name": CTId,
              "state": 'DEF',
              "validFor": { startDateTime: date },
              "popsType": 'DISC',
              "frequency": disFrequency,
              "price": {
                "units": {
                  "code": 'USD',
                  "name": 'US Dollars',
                }
              },
                "discountDetails": {
                  "discountType": "P",
                  "percentage": percValue
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
