/**
 * Creation Date: 26/10/2018
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

export class CreateChargeTypeUsageRest {
  async performPost(
    CTId: String,
    projectId: String,
    user: string,
    pass: string,
    CTValue: number
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
          id: CTId,
          versions: [
            {
              id: CTId,
              name: CTId,
              state: 'DEF',
              validFor: { startDateTime: date },
              popsType: 'CHAG',
              frequency: 'U',
              price: {
                amount: CTValue,
                units: {
                  code: 'USD',
                  name: 'US Dollars',
                },
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
