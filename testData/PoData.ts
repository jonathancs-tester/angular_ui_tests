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

export const PONAME = {
  poSC1: 'PO_BASE_AUTO_DATA',
  poSC2: 'PO_BASE_AUTO_DATA_2180615093354_',
  poSC4: 'PO_AUTO_ACTIVE180615100205_NEW_1',
};

export const EXPECTDATA = {
  urlPoSC1:
    config.baseUrl +'/ecm-standalone/#/create/po/detail/' +
    PONAME.poSC1 +'/latest/price',
  urlPoSC2:
    config.baseUrl +'/ecm-standalone/#/create/po/detail/' +
    PONAME.poSC2 +'/latest/price',
  urlPoSC4:
    config.baseUrl +'/ecm-standalone/#/create/po/detail/' +
    PONAME.poSC4 +'/latest/price',
};
