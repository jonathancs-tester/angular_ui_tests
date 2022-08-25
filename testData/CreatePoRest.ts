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

var helper = new Helper();
let axios = require('axios');

export class CreatePORest {
  async performPost(
    POId: string,
    PSId: string,
    projectId: String,
    date,
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
              baseEntityId: 'base_ProductOffering',
              validFor: {
                startDateTime: date
              },
              associations: [
                {
                  validFor: {
                    startDateTime: date,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
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

  async performPostWithName(
    POId: string,
    PSId: string,
    projectId: String,
    date: Date,
    user: string,
    pass: string,
    POname: string
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
              name: POname,
              baseEntityId: 'base_ProductOffering',
              validFor: {
                startDateTime: date
              },
              associations: [
                {
                  validFor: {
                    startDateTime: date,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
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

  async performPostWithEndDate(
    POId: string,
    PSId: string,
    projectId: String,
    date: Date,
    endDate: Date,
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
              baseEntityId: 'base_ProductOffering',
              validFor: {
                startDateTime: date,
                endDateTime: endDate
              },
              associations: [
                {
                  validFor: {
                    startDateTime: date,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
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
