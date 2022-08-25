/**
 * Creation Date: 25/03/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class CreateAttachmentRest {
  async performPost(
    projectId: string,
    poId: string,
    user: string,
    pass: string,
    attachmentId: string,
    attachmentName: string,
    attachmentNameWithExtension: string,
    startDate: Date,
    attachmentType?: string,
    attachmentMimeType?: string
  ) {
    try {
      let imageType = attachmentNameWithExtension.split('.')[1];
      let media = null;
      let documents = null;
      if (attachmentMimeType === void 0) {
        media = {
          "id": attachmentId,
          "name": attachmentName,
          "imageType": imageType,
          "imageSize": "N",
          "category": attachmentType
        };
      } else {
        documents = {
          "id": attachmentId,
          "name": attachmentName,
          "type": attachmentType,
          "mimeType": attachmentMimeType,
          "attachmentName": attachmentNameWithExtension
        };
      }
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + poId,
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
          "id": poId,
          "versions": [{
            "id": poId,
            "validFor": {
              "startDateTime": startDate
            },
            "specificationType": "ProductOffering",
            "documents": documents,
            "media": media
          }]
        },
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
