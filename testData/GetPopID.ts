/**
 * Creation Date: 25/07/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

//For this API works the startDateTime must be the same of the po date including the seconds.
import { config } from '../steps/config';
let axios = require('axios');

export class GetPopID {
  async getPopID(
    basicPoId: string,
    user: string,
    pass: string
  ) {
    try {
      let response = await axios({
        method: 'get',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productOffering/' + basicPoId,
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        }
      });
      console.log(await response.data.versions[0]);
      return axios;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

}
