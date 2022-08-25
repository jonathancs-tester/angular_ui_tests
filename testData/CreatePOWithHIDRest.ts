/**
 * Creation Date: 21/01/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';

let axios = require('axios');

export class CreatePOWithHIDRest {
  async performPost(
    POId: string,
    PSId: string,
    projectId: String,
    date: Date,
    HID: string,
    user: string,
    pass: string
  ) {
    try {      
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering',
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
          id: POId,
          humanReadableId: HID,
          versions: [
            {
              id: POId,
              humanReadableId: HID, 
              name: POId,
              baseEntityId: 'base_ProductOffering',
              validFor: {
                startDateTime: date,
              },
              associations: [
                {
                  validFor: {
                    startDateTime: date,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
            },
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
