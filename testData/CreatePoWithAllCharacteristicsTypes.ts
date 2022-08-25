/**
 * Creation Date: 11/03/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { config } from '../steps/config';

let axios = require('axios');

export class CreatePoWithAllCharacteristicsTypes {
  async performPost(
    POId: string,
    PSId: string,
    projectId: String,
    startDate: Date,
    user: string,
    pass: string,
    characSuffix: string,
    ReadOnlyOnExtension: boolean = null,
    ReadOnlyInNewVersions: boolean = null,
    READONLY: boolean = null
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
                startDateTime: startDate,
              },
              associations: [
                {
                  validFor: {
                    startDateTime: startDate,
                  },
                  targetSpecificationId: PSId,
                  targetSpecificationType: 'ProductSpecification',
                  associationType: 'contains',
                  id: 'reserved_0_PO_to_PS',
                  maxQuantity: 1,
                },
              ],
              "characteristics": [{
                "id": "CharacString"+characSuffix,
                "versions": [{
                    "id": "CharacString"+characSuffix,
                    "value": "string value",
                    "name": "NameCharacString"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "type": "pscmUserAttribute",
                    "valueType": "String",
                    "maxCardinality": "1",
                    "sequence": 1,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              },{
                "id": "CharacFormula"+characSuffix,
                "versions": [{
                  "id": "CharacFormula"+characSuffix,
                  "name": "NameCharacFormula"+characSuffix,
                  "validFor": {
                    "startDateTime": startDate
                  },
                  "type": "pscmCharacteristicAttribute",
                  "valueType": "String",
                  "characteristicValues": [{
                    "id": "exchangeDetermination",
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "valueType": "String",
                    "isDefault": true,
                    "name": "exchangeDetermination"
                  }],
                  "properties": [
                    {
                        "value": "CONF",
                        "isSelected": true
                    },
                    {
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                    },
                    {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                    },
                    {
                        "value": "READONLY",
                        "isSelected": READONLY
                    }
                  ],
                  "state": "DEF",
                  "derivationFormula": "exchangeDetermination",
                  "maxCardinality": "1",
                  "valueTypeSpecification": {
                    "id": "stringAttribute"
                  },
                  "changeState": "added",
                  "characteristicValueSpecification": {
                    "id": "stringAttribute",
                    "isReference": false
                  },
                  "isFormula": true
                  }
                ]
              }, {
                "id": "CharacInteger"+characSuffix,
                "versions": [{
                    "id": "CharacInteger"+characSuffix,
                    "name": "NameCharacInteger"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "value": "123456",
                    "type": "pscmUserAttribute",
                    "valueType": "Number",
                    "maxCardinality": "1",
                    "sequence": null,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }, {
                "id": "CharacBoolean"+characSuffix,
                "versions": [{
                    "id": "CharacBoolean"+characSuffix,
                    "name": "NameCharacBoolean"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "value": "0",
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "Boolean",
                    "valueTypeSpecification": {
                      "id": "booleanAttribute"
                    },
                    "maxCardinality": "1",
                    "sequence": 2,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }, {
                "id": "CharacDate"+characSuffix,
                "versions": [{
                    "id": "CharacDate"+characSuffix,
                    "name": "NameCharacDate"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "value": "2019-09-11T18:03:00.000Z",
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "Date",
                    "maxCardinality": "1",
                    "sequence": 4,
                    "valueTypeSpecification": {
                      "id": "dateAttribute"
                    },
                    "changeState": "added",
                    "isFormula": false,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }, {
                "id": "CharacSlider"+characSuffix,
                "versions": [{
                    "id": "CharacSlider"+characSuffix,
                    "name": "NameCharacSlider"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "value": "33",
                    "type": "pscmUserAttribute",
                    "valueType": "Number",
                    "characteristicValues": [{
                        "id": "0",
                        "validFor": {
                          "startDateTime": startDate
                        },
                        "value": "0",
                        "valueType": "Number",
                        "isDefault": true,
                        "displayValue": "0",
                        "name": "0"
                      }, {
                        "valueRanges": [{
                            "rangeInterval": "closed",
                            "rangeStep": "1",
                            "valueFrom": "0",
                            "valueTo": "100",
                            "valueFromInclusive": true,
                            "valueToInclusive": true
                          }
                        ]
                      }
                    ],
                    "state": "DEF",
                    "maxCardinality": 1,
                    "displayValue": "0",
                    "valueTypeSpecification": {
                      "id": "numberAttribute"
                    },
                    "changeState": "added",
                    "characteristicValueSpecification": {
                      "id": "numberAttribute",
                      "isReference": false
                    },
                    "isFormula": false,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }, {
                "id": "CharacRegex"+characSuffix,
                "versions": [{
                    "id": "CharacRegex"+characSuffix,
                    "name": "NameCharacRegex"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "value": "aaa",
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "String",
                    "characteristicValues": [{
                        "regularExpression": "[a-z]{3}"
                      }, {
                        "id": "a",
                        "validFor": {
                          "startDateTime": startDate
                        },
                        "value": null,
                        "valueType": "String",
                        "isDefault": true,
                        "displayValue": null,
                        "name": "a"
                      }
                    ],
                    "state": "DEF",
                    "maxCardinality": 1,
                    "valueTypeSpecification": {
                      "id": "stringAttribute"
                    },
                    "characteristicValueSpecification": {
                      "id": "stringAttribute",
                      "isReference": false
                    },
                    "isFormula": false,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }, {
                "id": "CharacCDMultiTags"+characSuffix,
                "versions": [{
                    "id": "CharacCDMultiTags"+characSuffix,
                    "name": "NameCharacCDMultiTags"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "CodeTable",
                    "state": "DEF",
                    "minCardinality": 0,
                    "maxCardinality": 2,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }],
                    "isArray": true,
                    "valueTypeSpecification": {
                      "id": "AttCodeTableMultiTags"
                    },
                    "changeState": "added",
                    "characteristicValueSpecification": {
                      "id": "AttCodeTableMultiTags",
                      "isReference": true,
                      "referenceList": {
                        "id": "CodeTableMultiTags",
                        "href": "/ecm/ecm/CatalogManagement/v2/referenceList/CodeTableMultiTags/listElement"
                      }
                    },
                    "isFormula": false
                  }
                ]
              }, {
                "id": "CharacCDMultiSelector"+characSuffix,
                "versions": [{
                    "id": "CharacCDMultiSelector"+characSuffix,
                    "name": "NameCharacCDMultiSelector"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "CodeTable",
                    "state": "DEF",
                    "minCardinality": 0,
                    "maxCardinality": 2,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }],
                    "isArray": true,
                    "valueTypeSpecification": {
                      "id": "AttCodeTableMultiSelector"
                    },
                    "changeState": "added",
                    "characteristicValueSpecification": {
                      "id": "AttCodeTableMultiSelector",
                      "isReference": true,
                      "referenceList": {
                        "id": "CodeTableMultiSelector",
                        "href": "/ecm/ecm/CatalogManagement/v2/referenceList/CodeTableMultiSelector/listElement"
                      }
                    },
                    "isFormula": false
                  }
                ]
              }, {
                "id": "CharacCDSingleSelector"+characSuffix,
                "versions": [{
                    "id": "CharacCDSingleSelector"+characSuffix,
                    "name": "NameCharacCDSingleSelector"+characSuffix,
                    "validFor": {
                      "startDateTime": startDate
                    },
                    "type": "pscmCharacteristicAttribute",
                    "valueType": "CodeTable",
                    "state": "DEF",
                    "maxCardinality": 1,
                    "valueTypeSpecification": {
                      "id": "AttCodeTableMultiSelector"
                    },
                    "changeState": "added",
                    "characteristicValueSpecification": {
                      "id": "AttCodeTableMultiSelector",
                      "isReference": true,
                      "referenceList": {
                        "id": "CodeTableMultiSelector",
                        "href": "/ecm/ecm/CatalogManagement/v2/referenceList/CodeTableMultiSelector/listElement"
                      }
                    },
                    "isFormula": false,
                    "properties": [{
                        "value": "ReadOnlyOnExtension",
                        "isSelected": ReadOnlyOnExtension
                      },
                      {
                        "value": "ReadOnlyInNewVersions",
                        "isSelected": ReadOnlyInNewVersions
                      },
                      {
                        "value": "READONLY",
                        "isSelected": READONLY
                      }]
                  }
                ]
              }
            ]
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
