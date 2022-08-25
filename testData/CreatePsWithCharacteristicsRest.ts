/**
 * Creation Date: 17/12/2018
 * Author: Fabiana Fraga Ferreira
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

export class CreatePSWithCharacteristicsRest {
  async performPost(
    characteristicName: string,
    PSId: string,
    projectId: String,
    user: string,
    pass: string
  ) {
    try {
      let date = await helper.getEffectiveDate(+2);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productSpecification',
        headers: {
          'content-type': 'application/json',
        },
        params: {
          project: projectId,
        },
        auth: {
          username: 'upadmin',
          password: 'upadmin',
        },
        data: {
          productNumber: PSId,
          versions: [
            {
              name: PSId + '_name',
              validFor: {
                startDateTime: date,
              },
              characteristics: [
              {
                id: 'chString',
                versions: [
                    {
                        id: 'id_'+characteristicName,
                        name: characteristicName,
                        validFor: {
                            startDateTime: date
                        },
                        type: 'pscmUserAttribute',
                        valueType: 'String',
                        state: 'DEF',
                        maxCardinality: 1,
                        properties: [
                            {
                                value: 'CONF',
                                isSelected: true
                            }
                        ],
                        valueTypeSpecification: {
                            id: 'stringAttribute'
                        },
                        changeState: 'added',
                        characteristicValueSpecification: {
                            id: 'stringAttribute',
                            isReference: false
                        }
                    },
                  ],
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