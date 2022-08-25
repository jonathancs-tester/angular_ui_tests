/**
 * Creation Date: 18/12/2018
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

export class UpdatePOWithRelated {
  async performPatch(
    basicPoId,
    optionalPOId,
    projectId,
    date,
    user,
    pass,
    associationType = 'optionalFor'
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
            "baseEntityId": "base_ProductOffering",
            "validFor": {
              "startDateTime": date
            },
            "specificationType": "ProductOffering",
            "associations": [{
              "validFor": {
                "startDateTime": date
              },
              "targetSpecificationId": optionalPOId,
              "associationType": associationType,
              "id": optionalPOId,
              "disabled": false
            }
            ]
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
