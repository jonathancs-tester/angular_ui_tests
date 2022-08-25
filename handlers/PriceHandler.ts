/**
 * Creation Date: 25/01/2019
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
import { CreateChargeTypeMRest } from "../testData/CreateChargeTypeMRest";
import { CreatePriceSpecRest } from "../testData/CreatePriceSpecRest";
import { UpdatePOWithRelated } from "../testData/UpdatePOWithRelated";
import { ActivateProjectRest } from "../testData/ActivateProjectRest";
import { Helper } from "../Utils/Helpers/Helper";
import { CreatePriceListRest } from "../testData/CreatePriceListRest";
import { CreatePOWithPriceRow } from '../testData/CreatePOWithPriceRow';
import { AddRuleInPrice } from "../testData/AddRuleInPrice";
import { POHandler } from "../testData/POHandler";
import moment = require("moment");
import { CreatePriceWithCharacteristicsRest } from "../testData/CreatePriceWithCharacteristicsRest";

export class PriceHandler {

    async createPOWithCTmRelatedUnderBasicActive(user: string, pass: string, priceValue: number) {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let CT = new CreateChargeTypeMRest();
        let priceSpec = new CreatePriceSpecRest();
        let createRelation = new UpdatePOWithRelated();
        let activateProject = new ActivateProjectRest();
        let helper = new Helper();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let optionalPSId = "PS_Opt" + start;
        let optionalPOId = "PO_Opt" + start;
        let basicPSId = "PS_Basic" + start;
        let basicPOId = "PO_Basic" + start;
        let CTId = "CT_M_" + start;
        let CTValue = 1
        let PODate = await helper.getEffectiveDate(+5);
        await project.performPost(projectId, user, pass);
        await PS.performPost(optionalPSId, projectId, user, pass);
        await PO.performPost(optionalPOId, optionalPSId, projectId, PODate, user, pass);
        await CT.performPost(CTId, projectId, user, pass, CTValue);
        await priceSpec.performPost(optionalPOId, CTId, projectId, user, pass, priceValue, "ID_" + CTId);
        await PS.performPost(basicPSId, projectId, user, pass);
        await PO.performPost(basicPOId, basicPSId, projectId, PODate, user, pass);
        await createRelation.performPatch(basicPOId,optionalPOId,projectId, PODate,user, pass);
        await activateProject.performPost(projectId, user, pass);
        await console.log(projectId);
        await console.log(optionalPOId);
        await console.log(basicPOId);

        return [projectId, optionalPOId, basicPOId, CTId, PODate];
      }

    async createPOWithOneTimePriceList(user: string, pass: string, state: string) {
        let oneTimePriceName = 'CT_ONETIME_PRICELIST';
        return await this.createPOWithPriceList(oneTimePriceName, user, pass, state);
      }

      async createPOWithRecurringPriceList(user: string, pass: string, state: string) {
        let recurringPriceName = 'CT_PRICE_MULTI_RANGE';
        return await this.createPOWithPriceList(recurringPriceName, user, pass, state);
      }

      async createPOWithUsagePriceList(user: string, pass: string, state: string) {
        let usagePriceName = 'CT_USG_PRICELIST_RULE_ASSIGNMENT';
        return await this.createPOWithPriceList(usagePriceName, user, pass, state);
      }

    async createPOWithPriceList(typePriceName: string,user: string, pass: string, state: string) {
        const project = new CreateProjectRest();
        const PS = new CreatePSRest();
        const PO = new CreatePORest();
        const priceList = new CreatePriceListRest();
        const helper = new Helper();
        const start = Date.now();
        const projectId = "Proj_" + start;
        const PSId = "PS_" + start;
        const POId = "PO_" + start;
        const priceName = typePriceName;
        const PODate = await helper.getEffectiveDate(+5);
        await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPost(POId, PSId, projectId, PODate, user, pass);
        let priceListResponse = await priceList.performPost(POId, projectId, priceName, user, pass);
        let ruleId = priceListResponse[1];
        if (state == 'active') {
          const activateProject = new ActivateProjectRest();
          await activateProject.performPost(projectId, user, pass);
        }
        await console.log(projectId);
        await console.log(POId);
        await console.log(PSId);
        await console.log("Price list name: " + priceName);
        await console.log("Price list id: " + priceListResponse[0]);
        await console.log("rule id: " + ruleId);
        return [projectId, POId, PSId, PODate, priceName, priceListResponse[0], ruleId];
      }

    async createPOWithOneTimePriceListWithNRows(user: string, pass: string, state: string, values: string[], randomValues: boolean = true) {
      const helper = new Helper();
      let project = await this.createPOWithOneTimePriceList(user, pass, 'definition');
      let ruleId = project[6];
      let numberOfLines = "";
      let contractTerm = "";
      let customerType = "";
      let customerLocation = "";
      for (let a = 0; a < values.length; a++) {
        const createPOWithPriceRow = new CreatePOWithPriceRow();
        let rowId = "A" + a + await helper.generateId(16);
        if (randomValues) {
          numberOfLines = await (await helper.generateRandomInteger(1, 3)).toString();
          contractTerm = await (await helper.generateRandomInteger(1, 5)).toString();
          customerType = await (await helper.generateRandomInteger(1, 4)).toString();
          customerLocation = await (await helper.generateRandomInteger(1, 4)).toString();
        }
        await createPOWithPriceRow.performPostPrice(rowId, project[0], project[3], user, pass, ruleId, values[a], numberOfLines, contractTerm, customerType, customerLocation);
      }
      if (state == 'active') {
        const activateProject = new ActivateProjectRest();
        await activateProject.performPost(project[0], user, pass);
      }
      return project;
    }

    async createPOWithPrice(user: string, pass: string, state: string, priceId: string) {
      let project = new CreateProjectRest();
      let PS = new CreatePSRest();
      let PO = new CreatePORest();
      let priceSpec = new CreatePriceSpecRest();
      let helper = new Helper();
      let start = Date.now();
      let projectId = "Proj_" + start;
      let PSId = "PS_" + start;
      let POId = "PO_" + start;
      let PODate = await helper.getEffectiveDate(+5);
      await project.performPost(projectId, user, pass);
      await PS.performPost(PSId, projectId, user, pass);
      await PO.performPost(POId, PSId, projectId, PODate, user, pass);
      await priceSpec.performPost(POId, priceId, projectId, user, pass, null, "ID_" + priceId);
      if (state == 'active') {
        const activateProject = new ActivateProjectRest();
        await activateProject.performPost(projectId, user, pass);
      }
      await console.log(projectId);
      await console.log(PSId);
      await console.log(POId);
      await console.log(priceId);

      return [projectId, PSId, POId, PODate, priceId];
    }

    async createPOWithBuyNowWithCharacteristics(user: string, pass: string, state: string,
      ReadOnlyOnExtension: boolean = null, ReadOnlyInNewVersions: boolean = null, READONLY: boolean = null){
        let POwithPrice = await this.createPOWithPriceWithAllCharacteristics(user, pass, state, 'buynowUSD', 10, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        return await POwithPrice;
    }

    async createPOWithPriceWithAllCharacteristics(user: string, pass: string, state: string, priceId: string, priceValue: number,
      ReadOnlyOnExtension: boolean = null, ReadOnlyInNewVersions: boolean = null, READONLY: boolean = null) {
      let project = new CreateProjectRest();
      let PS = new CreatePSRest();
      let PO = new CreatePORest();
      let priceSpec = new CreatePriceWithCharacteristicsRest();
      let helper = new Helper();
      let start = Date.now();
      let projectId = "Proj_" + start;
      let PSId = "PS_" + start;
      let POId = "PO_" + start;
      let PODate = await helper.getEffectiveDate(+5);
      let characId = await helper.generateId(5);
      const newPriceId = "ID_" + priceId + '_' + characId;
      await project.performPost(projectId, user, pass);
      await PS.performPost(PSId, projectId, user, pass);
      await PO.performPost(POId, PSId, projectId, PODate, user, pass);
      await priceSpec.performPost(POId, priceId, projectId, user, pass, priceValue, newPriceId, characId, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
      if (state == 'active') {
        const activateProject = new ActivateProjectRest();
        await activateProject.performPost(projectId, user, pass);
      }
      await console.log(projectId);
      await console.log(PSId);
      await console.log(POId);
      await console.log(newPriceId);

      return [projectId, PSId, POId, PODate, characId, newPriceId];
    }

    async createPOWithFormulaPrice(user: string, pass: string, state: string) {
      return await this.createPOWithPrice(user, pass, state, 'Price_JS_Formula');
    }

    async createPOWithPriceGroup(user: string, pass: string, state: string) {
      const poHandler = new POHandler();
      let proj = await poHandler.createBasicProjectAndDefinitionPOAndPS(user, pass);
      let projectId = proj[0].toString();
      let poId = proj[2].toString();
      let date =  await moment(proj[3]).toDate();
      let addPrice = await this.addPriceGroupToPO(projectId, poId, date, null, user, pass);
      let priceId = addPrice[3];
      let popId = addPrice[4];
      if (state == 'active') {
        const activateProject = new ActivateProjectRest();
        await activateProject.performPost(projectId, user, pass);
      }
      return [projectId, poId, date, priceId, popId];
    }

    async addPriceGroupToPO(projectId, poId, date, priceValue, user, pass) {
      const priceId = 'CT_MULTI_TAGS_2';
      let popId = 'POP_ID_' + Date.now();
      let priceSpec = new CreatePriceSpecRest();
      await priceSpec.performPost(poId, priceId, projectId, user, pass, priceValue, popId);
      await this.addMultiLeafRuleToPrice(projectId, poId, popId, priceId, date, priceValue, user, pass);
      return [projectId, poId, date, priceId, popId];
    }

    async createBasicPOWithCTmWithRuleAlways(user: string, pass: string, priceValue: number, state: string) {
      const poHandler = new POHandler();
      let proj = await poHandler.createBasicPOWithCTm(user, pass, priceValue);
      let projectId = proj[0].toString();
      let poId = proj[2].toString();
      let ctId = proj[3].toString();
      let popId = 'ID_' + ctId;
      let date =  await moment(proj[4]).toDate();
      let ruleResponse = await this.addAlwaysRuleToPrice(projectId, poId, popId, ctId, date, priceValue, user, pass);
      if (state == 'active') {
        const activateProject = new ActivateProjectRest();
        await activateProject.performPost(projectId, user, pass);
      }
      return [projectId, poId, date, ctId]
    }

    async addAlwaysRuleToPrice(projectId, poId, popId, ctId, date, priceValue, user, pass) {
      const addRuleInPrice = new AddRuleInPrice();
      return await addRuleInPrice.performPost(projectId, poId, popId, ctId, date, priceValue, user, pass, "Recurring", "M", "Always", "eligibility");;
    }

    async addMultiLeafRuleToPrice(projectId, poId, popId, ctId, date, priceValue, user, pass) {
      const addRuleInPrice = new AddRuleInPrice();
      return await addRuleInPrice.performPost(projectId, poId, popId, ctId, date, priceValue, user, pass, "One-Time", "O", "RuleJs_MultiLeaf", "eligibility");;
    }
}