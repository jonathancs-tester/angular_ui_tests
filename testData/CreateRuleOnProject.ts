/**
 * Creation Date: 10/04/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class CreateRuleOnProject {
  async performPost(
    projectId: string,
    date: Date,
    user: string,
    pass: string,
    spaceName: string,
    POId: string,
    ruleSegmentAPI: string
  ) {
    try {
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/rule/',
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
          "ruleSpaceSpec": {
            "id": spaceName,
            "href": "/ecm/ecm/CatalogManagement/v2/ruleSpaceSpecification/" + spaceName
          },
          "id": "wrapper_MS_" + POId,
          "versions": [{
            "id": "wrapper_MS_" + POId,
            "description": "Wrapper Rule wrapper_MS_" + POId,
            "implementationType": "MDR",
            "name": "wrapper_MS_" + POId + " to Apply MS",
            "project": projectId,
            "returnType": "B",
            "ruleType": "S",
            "disabled": false,
            "properties": [{
              "id": "isComposite",
              "value": "true"
            }],
            "state": "DEF",
            "validFor": {
              "startDateTime": date
            },
            "ruleAssignments": [{
              "id": ruleSegmentAPI,
              "state": "DEF",
              "parent": {
                "id": spaceName,
                "type": "rule"
              },
              "entity": {
              },
              "condition": {
                "conditionType": "segment",
                "segment": {
                  "id": ruleSegmentAPI
                }
              },
              "value": {
                "exclude": false
              }
            }]
          }]
        }
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
