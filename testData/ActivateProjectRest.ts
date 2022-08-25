/**
 * Creation Date: 13/08/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';
let axios = require('axios');

export class ActivateProjectRest {
  async performPost(projectId, username: string, password: string) {
    try {
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl +
          '/ecm/ecm/CatalogManagement/v2/project/' +
          projectId +
          '/activate',
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
      });
    } catch (error) {
      console.log(error.data);
    }
  }
}
