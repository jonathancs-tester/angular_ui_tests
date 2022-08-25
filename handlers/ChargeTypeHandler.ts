/**
 * Creation Date: 25/01/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { CreateProjectWithStartDateFutureRest } from "../testData/CreateProjectWithStartDateFutureRest";
import { CreateChargeTypeMRest } from "../testData/CreateChargeTypeMRest";
import { ActivateProjectRest } from "../testData/ActivateProjectRest";
import { POHandler } from "../testData/POHandler";
import { ProductOfferingHandler } from "./ProductOfferingHandler";
import { UpdatePOWithRelated } from "../testData/UpdatePOWithRelated";
import { UpdatePOWithDiscOffer } from "../testData/UpdatePOWithDiscOffer";


export class ChargeTypeHandler {

    async createProjAndCTMonthly(ctValue: number, projectStartDate, ctStartDate, user: string, pass: string) {
        let project = new CreateProjectWithStartDateFutureRest();
        let CT = new CreateChargeTypeMRest();
        let activateProject = new ActivateProjectRest();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let CTId = "CT_M" + start;
        console.log(projectId);
        console.log(CTId);
        await project.performPostDynamicDate(projectId, projectStartDate, user, pass);
        await CT.performPostDynamicDate(CTId, projectId, user, pass, ctValue, ctStartDate);
        await activateProject.performPost(projectId, user, pass);

        return [projectId, CTId];

      }

      async createPoWithRelationDiscounFor(user: string, pass: string) {
        let activateProject = new ActivateProjectRest();
        let poHandler = new POHandler();
        const poOfferDisc = new ProductOfferingHandler();
        const createDiscRelation = new UpdatePOWithRelated();
        const createOfferDisc = new UpdatePOWithDiscOffer();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let CTId = "CT_M" + start;
        console.log(projectId);
        console.log(CTId);
        let basicPo = await poOfferDisc.createBasicProjectAndPOAndPSWithDateOffset(user, pass, 30000, 50000 , 40000, 'definition');
        let discountFor = await poHandler.createBasicPOWithCTmAndCTOneAndCTUsage(user, pass, 30, 50 , 40);
        await activateProject.performPost(discountFor[0], user, pass);
        let ct = await poHandler.createProjCTDiscValue(10, user, user);
        await createOfferDisc.performPostCreatPOP(basicPo[2], "ID_POP_77777777779", ct[1], basicPo[0], user, pass )
        await createDiscRelation.performPatch(basicPo[2], discountFor[2], basicPo[0], basicPo[3], user, pass, 'discountFor');
        await createOfferDisc.performPatch(basicPo[2], discountFor[2], "ID_POP_77777777779", ct[1], discountFor[7], basicPo[0], basicPo[3], user, pass);
        await activateProject.performPost( basicPo[0], user, pass);

        return [projectId, basicPo[2], basicPo[3], CTId];
      }
}