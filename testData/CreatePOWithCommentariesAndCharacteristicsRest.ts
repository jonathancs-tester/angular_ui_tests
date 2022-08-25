/**
 * Creation Date: 28/01/2019
 * Author: Lucas Abrita
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

export class CreatePOWithCommentariesAndCharacteristicsRest {
  async performPost(
    POId: string,
    PSId: string,
    projectId: string,
    descriptionText: string,
    descriptionID1: string,
    descriptionID2: string,
    poDate: Date,
    psDate: Date,
    user: string,
    pass: string,
    characteristicId: string
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
              validFor: {
                startDateTime: poDate,
              },
              characteristics: [{
                id: characteristicId,
                versions: [{
                id: characteristicId,
                  name: characteristicId,
                  validFor: {
                    startDateTime: "2035-08-10T12:38:37.000Z"
                  },
                  value: characteristicId,
                  type: "pscmUserAttribute",
                  valueType: "String",
                  characteristicValues: [{
                    validFor: {
                      startDateTime: "2035-08-10T12:38:37.000Z"
                    },
                    value: characteristicId,
                    valueType: "String",
                    isDefault: true,
                    displayValue: characteristicId
                  }],
                  state: "DEF",
                  translations: [{
                    fieldname: characteristicId,
                    translation: [{
                      text: characteristicId,
                      language: "en-xx"
                    }]
                  }],
                  displayValue: characteristicId
                }]
              }],
              associations: [
                {
                  validFor: {
                    startDateTime: psDate,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
              sellIndicator: false,
              commentaries: [
                {
                  id: descriptionID1,
                  description: descriptionText,
                  category: 'description',
                  classificationTypes: [
                    {
                      value: 'AUDIT',
                      isSelected: true,
                    },
                  ],
                  translations: [
                    {
                      fieldname: 'description',
                      translation: [
                        {
                          text: descriptionText,
                          language: 'en-xx',
                        },
                      ],
                    },
                  ],
                  startDate: poDate,
                  status: 'DEF',
                },
                {
                  id: descriptionID2,
                  category: 'description',
                  translations: [
                    {
                      fieldname: 'description',
                      translation: [
                        {
                          language: 'en-xx',
                        },
                      ],
                    },
                  ],
                  startDate: poDate,
                  status: 'DEF',
                  disabled: true,
                },
              ],
              versionIdentifier: '1.0',
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
