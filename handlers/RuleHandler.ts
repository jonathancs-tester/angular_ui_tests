/**
 * Creation Date: 12/07/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { CreateProjectRest } from "../testData/CreateProjectRest";
import { CreatePSRest } from "../testData/CreatePsRest";
import { CreatePORest } from "../testData/CreatePORest";
import { Helper } from "../Utils/Helpers/Helper";
import { CreateRuleTypeCRRest } from "../testData/CreateRuleTypeCRRest";
import { UpdatePOWithRuleRelation } from "../testData/UpdatePOWithRuleRelation";
import { CreateRuleTypeJSRest } from "../testData/CreateRuleTypeJSRest";
import { CreateRuleTypeMDRRest } from "../testData/CreateRuleTypeMDRRest";
import { CreatePODevice } from "../testData/CreatePODevice";
import { UpdatePOWithRuleTranslation } from "../testData/UpdatePOWithRuleTranslation";

export class RuleHandler {

    async createPOWithRuleType(poType, isTranslated, ruleType, ruleLanguage, user, pass) {
        let project = new CreateProjectRest()
        let PS = new CreatePSRest()
        let PO = new CreatePORest();
        let device = new CreatePODevice();
        let createRuleTypeCR = new CreateRuleTypeCRRest();
        let createRuleTypeJS = new CreateRuleTypeJSRest();
        let createRuleTypeMDR = new CreateRuleTypeMDRRest();
        let createRuleRelation = new UpdatePOWithRuleRelation();
        let updatePOWithRuleTransl = new UpdatePOWithRuleTranslation();
        let helper = new Helper();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let poDate = await helper.getEffectiveDate(+5);
        let ruleID = null;
        let crRuleId = "Rule_CR_" + start;
        let jsRuleId = "Rule_JS_" + start;
        let mdrRuleId = "Rule_MDR_" + start;
        await console.log(projectId);
        await console.log(POId);
        await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        if (poType == 'device') {
            await device.createDeviceBasicPSWithTwoDesc(POId, PSId, 'Samsung Galaxy S9', 'Samsung S9 Desc', projectId, poDate, user, pass);
        } else {
            await PO.performPost(POId, PSId, projectId, poDate, user, pass);
        }
        let relationID = '';
        switch (ruleLanguage) {
            case 'CR':
                await createRuleTypeCR.performPost(projectId, crRuleId, user, pass);
                ruleID = crRuleId;
                relationID = 'relationCR123';
                break;
            case 'JS':
                await createRuleTypeJS.performPost(projectId, jsRuleId, user, pass);
                ruleID = jsRuleId;
                relationID = 'relationJS456';
                break;
            case 'MDR':
                await createRuleTypeMDR.performPost(projectId, mdrRuleId, user, pass)
                ruleID = mdrRuleId;
                relationID = 'relationMDR789';
                break;
        }
        await createRuleRelation.performPatch(POId, projectId, poDate, ruleType, ruleID, relationID, user, pass);
        if (isTranslated == 'yes') {
            let arrayLanguages = ['en-US', 'pt-BR', 'ar', 'fr', 'es', 'sv', 'de', 'zh'];
            for (let i = 0; i < arrayLanguages.length; i++) {
                await updatePOWithRuleTransl.UpdatePOWithRuleTranslation(POId, projectId, poDate, relationID, arrayLanguages[i] + " rule name", ruleType, arrayLanguages[i], user, pass);
            }
        }

        return [projectId, POId, poDate, ruleID];
    }
}