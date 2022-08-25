/**
 * Creation Date: 08/04/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class CreateRuleSegmentRest {
  async performPost(
    projectId: string,
    date: Date,
    user: string,
    pass: string,
    attributeName: string,
    spaceName: string,
    personalInfo: string,
    ruleSegmentAPI: string
  ) {
    try {
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/rule',
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
        data: [{
          "id": ruleSegmentAPI,
          "href": "/ecm/ecm/CatalogManagement/v2/rule/" + ruleSegmentAPI,
          "ruleParameters": [{
            "id": personalInfo,
            "href": "/ecm/ecm/CatalogManagement/v2/rule/" + ruleSegmentAPI + "/ruleParameter/" + attributeName,
            "name": personalInfo,
            "sequence": 1,
            "valueTypeSpec": {
              "id": attributeName,
              "href": "/ecm/ecm/CatalogManagement/v2/characteristicValueSpecification/" + attributeName,
              "validFor": {
                "startDateTime": date
              },
              "state": "DEF",
              "valueType": "7",
              "length": 0,
              "precision": 0
            }
          }],
          "ruleSpaceSpec": {
            "id": spaceName,
            "href": "/ecm/ecm/CatalogManagement/v2/ruleSpaceSpecification/" + spaceName
          },
          "versions": [{
            "id": ruleSegmentAPI,
            "href": "/ecm/ecm/CatalogManagement/v2/rule/" + ruleSegmentAPI + "/version/" + date,
            "name": ruleSegmentAPI,
            "state": "DEF",
            "validFor": {
              "startDateTime": date
            },
            "ruleType": "S",
            "implementationType": "MDR",
            "ruleAssignments": [
                
            ],
            "project": projectId,
            "properties": [
              {
                "id": "isComposite",
                "value": "false"
              }
            ]
          }]
        }],
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
