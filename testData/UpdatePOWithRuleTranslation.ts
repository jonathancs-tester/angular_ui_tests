/**
 * Creation Date: 12/08/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

//For this API works the startDateTime must be the same of the po date including the seconds.
import { config } from '../steps/config';
let axios = require('axios');

export class UpdatePOWithRuleTranslation {
  async UpdatePOWithRuleTranslation(
    basicPoId,
    projectId,
    date,
    relationID,
    poRuleTranslation,
    ruleType,
    language,
    user,
    pass
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + basicPoId,
        headers: {
          'content-type': 'application/json',
          'Accept-Language': language
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
          "versions": [
              {
                  "id": basicPoId,
                  "validFor": {
                      "startDateTime": date
                  },
                  "rules": [
                      {
                          "id": relationID,
                          "name": poRuleTranslation,
                          "type": ruleType
                      }
                  ]
              }
          ]
      },
      });
      //console.log(await response);
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async updateTranslationForPOAttachment(
    basicPoId: string,
    projectId: string,
    date,
    attID,
    attTranslationName: string,
    language: string,
    attType: string,
    user: string,
    pass: string
  ) {
    try {
      let media = null;
      let documents = null;
      if (attType == 'media') {
        media = {
          "id": attID,
          "name": attTranslationName
        };
      } else {
        documents = {
          "id": attID,
          "name": attTranslationName
        };
      }
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + basicPoId,
        headers: {
          'content-type': 'application/json',
          'Accept-Language': language
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
          "versions": [
              {
                  "id": basicPoId,
                  "validFor": {
                      "startDateTime": date
                  },
                  "documents": documents,
                  "media": media
                }
          ]
        },
      });
      // console.log(await response);
      return axios;
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }





}
