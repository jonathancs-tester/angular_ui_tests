/**
 * Creation Date: 30/06/2018
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

export class CreatePSRest {
  async performPost(
    PSId: string,
    projectId: String,
    user: string,
    pass: string
  ) {
    try {
      let date = await helper.getEffectiveDate(+2);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productSpecification',
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
          productNumber: PSId,
          versions: [
            {
              name: PSId + '_name',
              validFor: {
                startDateTime: date,
              },
            },
          ],
        },
      });
      return [axios, date];
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async performPostHoursOffset(
    PSId: string,
    projectId: String,
    user: string,
    pass: string,
    psDateOffset: number
  ) {
    try {
      let date = await helper.getEffectiveDateAddMinutes(psDateOffset);
      console.log("PS date: "+date);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productSpecification',
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
          productNumber: PSId,
          versions: [
            {
              name: PSId + '_name',
              validFor: {
                startDateTime: date,
              },
            },
          ],
        },
      });
      return axios;
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async performPostWithDate(
    PSId: string,
    projectId: String,
    user: string,
    pass: string,
    date: Date
  ) {
    try {
      console.log("PS date: "+date);
      let response = await axios({
        method: 'post',
        url:
          config.baseUrl + '/ecm/ecm/CatalogManagement/v2/productSpecification',
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
          productNumber: PSId,
          versions: [
            {
              name: PSId + '_name',
              validFor: {
                startDateTime: date,
              },
            },
          ],
        },
      });
      return axios;
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }
}
