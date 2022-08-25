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

export class AddAttachmentRest {
  async performPost(
    projectId: string,
    poId: string,
    user: string,
    pass: string,
    attachmentDir: string,
    attachmentId: string
  ) {
    try {
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/documents/' + poId + '/' + attachmentId,
        headers: {
          'content-type': 'multipart/form-data',
        },
        params: {
          project: projectId,
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          name : "attachment",
          filename : attachmentDir,
        }
      });
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
