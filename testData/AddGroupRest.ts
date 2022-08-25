/**
 * Creation Date: 14/05/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class AddGroupRest {
  async performPost(
    projectId: string,
    poId: string,
    startDate: Date,
    groupId: string,
    minCardinality: string,
    maxCardinality: string,
    poIdToAdd: string,
    username: string,
    password: string
    ) {
    try {
      let response = await axios({
        method: 'patch',
        url:
          config.baseUrl +
          '/ecm/ecm/CatalogManagement/v2/productOffering/' + poId,
        params: {
          project: projectId,
        },
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: username,
          password: password,
        },
        data: {
          "id": poId,
          "versions": [
            {
              "id": poId,
              "baseEntityId": "base_ProductOffering",
              "validFor": {
                "startDateTime": startDate
              },
              "specificationType": "ProductOffering",
              "associations": [
                {
                  "validFor": {
                    "startDateTime": startDate
                  },
                  "targetSpecificationId": poIdToAdd,
                  "targetSpecificationType": "ProductOffering",
                  "associationType": "optionalFor",
                  "id": poIdToAdd,
                  "disabled": false
                }
              ],
              "groups": [
                {
                  "minCardinality": minCardinality,
                  "maxCardinality": maxCardinality,
                  "targetAssociations": [
                    {
                      "associationId": poIdToAdd
                    }
                  ],
                  "id": groupId,
                  "name": groupId,
                  "disabled": false
                }
              ]
            }
          ]
        }
      });
    } catch (error) {
      console.log(error.data);
    }
  }

  async addEmptyGroup(
    projectId: string,
    poId: string,
    startDate: Date,
    groupId: string,
    minCardinality: string,
    maxCardinality: string,
    username: string,
    password: string
    ) {
    try {
      let response = await axios({
        method: 'patch',
        url:
          config.baseUrl +
          '/ecm/ecm/CatalogManagement/v2/productOffering/' + poId,
        params: {
          project: projectId,
        },
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: username,
          password: password,
        },
        data: {
          "id": poId,
          "versions": [
            {
              "id": poId,
              "baseEntityId": "base_ProductOffering",
              "validFor": {
                "startDateTime": startDate
              },
              "specificationType": "ProductOffering",
              "associations": [ ],
              "groups": [
                {
                  "minCardinality": minCardinality,
                  "maxCardinality": maxCardinality,
                  "targetAssociations": [ ],
                  "id": groupId,
                  "name": groupId,
                  "disabled": false
                }
              ]
            }
          ]
        }
      });
    } catch (error) {
      console.log(error.data);
    }
  }
}
