/**
 * Creation Date: 03/12/2018
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

export class CreatePOWithStartDateTodayEndDateFutureRest {
  async performPost(
    POId: string,
    PSId: string,
    projectId: String,
    user: string,
    pass: string
  ) {
    try {
      let startDate = await helper.getEffectiveDateAddHours(+3);
      console.log(startDate);
      let endDate = await helper.getEffectiveDate(+5);
      console.log(endDate);
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
                startDateTime: startDate,
                endDateTime: endDate,
              },
              associations: [
                {
                  validFor: {
                    startDateTime: startDate,
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
