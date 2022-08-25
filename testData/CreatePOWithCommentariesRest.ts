/**
 * Creation Date: 03/10/2018
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

export class CreatePOWithCommentariesRest {
  async performPost(
    POId: string,
    PSId: string,
    projectId: string,
    descriptionText: string,
    descriptionID1: string,
    descriptionID2: string,
    poDate: string,
    psDate: Date,
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
              validFor: {
                startDateTime: poDate,
              },
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

  async createPOWithDescTranslated(
    POId: string,
    PSId: string,
    projectId: string,
    descriptionID1: string,
    descriptionID2: string,
    poDate: string,
    psDate: Date,
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
              validFor: {
                startDateTime: poDate,
              },
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
                  description: "English Default Description 1",
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
                          text: 'en Translation Desc 1',
                          language: 'en-xx',
                        },
                        {
                          text: 'de Translation Desc 1',
                          language: 'de-xx',
                        },
                        {
                          text: 'ar Translation Desc 1',
                          language: 'ar-xx',
                        },
                        {
                          text: 'sv Translation Desc 1',
                          language: 'sv-xx',
                        },
                        {
                          text: 'zh Translation Desc 1',
                          language: 'zh-xx',
                        },
                        {
                          text: 'pt-BR Translation Desc 1',
                          language: 'pt-xx',
                        },
                        {
                          text: 'fr Translation Desc 1',
                          language: 'fr-xx',
                        },
                        {
                          text: 'es Translation Desc 1',
                          language: 'es-xx',
                        },
                      ],
                    },
                  ],
                  startDate: poDate,
                  status: 'DEF',
                },
                {
                  id: descriptionID2,
                  description: "English Default Description 2",
                  category: 'description',
                  translations: [
                    {
                      fieldname: 'description',
                      translation: [
                        {
                          text: 'en Translation Desc 2',
                          language: 'en-xx',
                        },
                        {
                          text: 'de Translation Desc 2',
                          language: 'de-xx',
                        },
                        {
                          text: 'ar Translation Desc 2',
                          language: 'ar-xx',
                        },
                        {
                          text: 'sv Translation Desc 2',
                          language: 'sv-xx',
                        },
                        {
                          text: 'zh Translation Desc 2',
                          language: 'zh-xx',
                        },
                        {
                          text: 'pt-BR Translation Desc 2',
                          language: 'pt-xx',
                        },
                        {
                          text: 'fr Translation Desc 2',
                          language: 'fr-xx',
                        },
                        {
                          text: 'es Translation Desc 2',
                          language: 'es-xx',
                        },
                      ],
                    },
                  ],
                  startDate: poDate,
                  status: 'DEF',
                  //disabled: true,
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
