/**
 * Creation Date: 07/06/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
import { Helper } from '../Utils/Helpers/Helper';
let axios = require('axios');

const helper = new Helper();

export class CreatePriceListRest {
  async performPost(
    POId: string,
    projectId: String,
    priceListType: string, // can be CT_ONETIME_PRICELIST
    user: string,
    pass: string
  ) {
    try {
      let CTId = await helper.generateId(32 - priceListType.length);
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
          id: priceListType + CTId,
          versions: [
            {
              id: priceListType + CTId,
              name: priceListType + CTId,
              price: {
                units: {
                  code: 'USD',
                  name: 'US Dollars',
                },
              },
              plaId: priceListType,
              validFor: {},
            },
          ],
        },
      });
      return [(priceListType + CTId), response.data[0].versions[0].formula];
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
