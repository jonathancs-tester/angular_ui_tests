/**
 * Creation Date: 01/11/2018
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

export class CreatePOWithRuleTypeJSRest {
  async performPost(
    POId: string,
    PSId: string,
    ruleId: string,
    projectId: String,
    user: string,
    pass: string,
    date
  ) {
    try {
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/',
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
              specificationType: 'ProductOffering',
              rules: {
                id: ruleId,
                type: 'validation',
                name: ruleId,
                ruleLanguage: '42S',
                ruleType: 'validation',
                sequence: '-',
                rule: {
                  id: ruleId,
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
