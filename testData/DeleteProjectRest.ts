/**
 * Creation Date: 31/01/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';

let axios = require('axios');

export class DeleteProjectRest {
  async performDelete(projectId: string, user: string, pass: string) {
    try {      
      let response = await axios({
        method: 'delete',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project/'+projectId,
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        },        
      });
      return response;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

}
