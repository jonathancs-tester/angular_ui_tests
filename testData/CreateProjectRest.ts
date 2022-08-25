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

export class CreateProjectRest {
  async performPost(projectId: string, user: string, pass: string, dateOffSet : number = 1) {
    try {
      let date = await helper.getEffectiveDate(+dateOffSet);
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project',
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          id: projectId,
          name: projectId + '_name',
          effectiveDate: date,
          state: 'DEF',
          description: projectId + '_description',
        },
      });
      return [response, date];
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async performPostWithDate(projectId: string, user: string, pass: string, date: Date) {
    try {
      console.log("Project date: "+date);
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project',
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          id: projectId,
          name: projectId + '_name',
          effectiveDate: date,
          state: 'DEF',
          description: projectId + '_description',
        },
      });
      return [response, date];
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async performPostHoursOffset(projectId: string, user: string, pass: string, projectDateOffset: number) {
    try {
      let date = await helper.getEffectiveDateAddMinutes(projectDateOffset);
      console.log("Project date: "+date);
      let response = await axios({
        method: 'post',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project',
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: user,
          password: pass,
        },
        data: {
          id: projectId,
          name: projectId + '_name',
          effectiveDate: date,
          state: 'DEF',
          description: projectId + '_description',
        },
      });
      return [response, date];
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async backDate(projectId: string) {
    try {
      let date = await helper.getEffectiveDate(-3);
      let response = await axios({
        method: 'patch',
        url: config.baseUrl + '/ecm/ecm/CatalogManagement/v2/project',
        params: {
          project: projectId,
        },
        headers: {
          'content-type': 'application/json',
        },
        auth: {
          username: 'upadmin',
          password: 'upadmin',
        },
        data: {
          id: projectId,
          name: projectId + '_name',
          effectiveDate: date,
          state: 'DEF',
          description: projectId + '_description',
        },
      });
    } catch (error) {
      console.log(error.data);
    }
  }
}
