/**
 * Creation Date: 28/08/2018
 * Author: Andreivan P. dos Santos
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

export class CreateTimeSliceRest {
  async performPost(
    POId: string,
    projectId: string,
    poDate : Date,
    user: string,
    pass: string,
    poName: string = ""
  ) {
    try {
      if (poName == "") {
        poName = POId + '_Name';
      }
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
              name: poName,
              state: 'DEF',
              validFor: {
                startDateTime: poDate,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
}
