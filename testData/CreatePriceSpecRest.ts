/**
 * Creation Date: 30/08/2018
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
var start = Date.now();

export class CreatePriceSpecRest {
  async performPost(
    POId: string,
    CTId: string,
    projectId: String,
    user: string,
    pass: string,
    priceValue: number,
    priceId: string
  ) {
    try {
      let date = await helper.getDateCT(+1);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl +
          '/ecm/ecm/CatalogManagement/v2/productOffering/' +
          POId +
          '/productOfferingPrice',
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
          id: priceId,
          versions: [
            {
              id: priceId,
              name: priceId,
              price: {
                amount: priceValue,
                units: {
                  code: 'USD',
                  name: 'US Dollars',
                },
              },
              plaId: CTId,
              validFor: {
                startDate: date,
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
