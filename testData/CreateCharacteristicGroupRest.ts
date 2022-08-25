/**
 * Creation Date: 16/01/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class CreateCharacteristicGroupRest {
  async performPatch(
    projectId: string,
    POId: string,
    user: string,
    pass: string,
    sequence: number,
    startDate,
    groupId: string,
    groupName: string
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + POId,
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
          "id": POId,
          "versions": [
            {
              "id": POId,
              "validFor": {
                  "startDateTime": startDate
              },
              "characteristics": [{
                "id": groupId,
                "versions": [
                    {
                        "id": groupId,
                        "name": groupName,
                        "validFor": {
                            "startDateTime": startDate
                        },
                        "value": groupName,
                        "type": "pscmCharacteristicAttribute",
                        "valueType": "ValueNotUsed",
                        "characteristicValues": [
                            {
                                "id": groupId,
                                "validFor": {
                                    "startDateTime": startDate
                                },
                                "value": groupName,
                                "valueType": "ValueNotUsed",
                                "isDefault": true,
                                "displayValue": groupName,
                                "name": groupName
                            }
                        ],
                        "state": "DEF",
                        "maxCardinality": 1,
                        "sequence": sequence,
                        "properties": [
                            {
                                "value": "GROUP",
                                "isSelected": true
                            }
                        ],
                        "displayValue": groupName,
                        "valueTypeSpecification": {
                            "id": "ValueNotUsed"
                        },
                        "propertiesPermissions": [
                            {
                                "id": "perm_readonly",
                                "type": "readonly",
                                "isSelected": true
                            }
                        ],
                        "changeState": "added",
                        "characteristicValueSpecification": {
                            "id": "ValueNotUsed",
                            "isReference": false
                        },
                        "isFormula": false
                    }
                ]
            }
            ]
            },
          ],
        },
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
