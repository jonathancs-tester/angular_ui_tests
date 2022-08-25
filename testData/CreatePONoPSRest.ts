/**
 * Creation Date: 08/08/2018
 * Author: Jéssica Souza Pivoto
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

export class CreatePONoPSRest {
  async performPost(
    POId: string,
    projectId: string,
    date: Date,
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
          versions: [
            {
              id: POId,
              name: POId,
              baseEntityId: 'base_ProductOffering',
              validFor: {
                startDateTime: date,
              },
              associations: [
                {
                  id: POId,
                  name: POId,
                  validFor: {
                    startDateTime: date,
                  },
                },
              ],
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
