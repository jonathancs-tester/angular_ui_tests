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
import { AddGroupRest } from "../testData/AddGroupRest";
import { CreatePoWithAllCharacteristicsTypes } from "../testData/CreatePoWithAllCharacteristicsTypes";
import { Helper } from '../Utils/Helpers/Helper';
import { ProjectHandler } from '../handlers/ProjectHandler';
import { POHandler } from '../testData/POHandler';
import { UpdatePOWithRelated } from "../testData/UpdatePOWithRelated";
import { AddPORelation } from "../testData/AddPORelation";
import { CreateProjectWithStartDateFutureRest } from "../testData/CreateProjectWithStartDateFutureRest";
import { CreateTimeSliceRest } from "../testData/CreateTimeSliceRest";
import { ActivateProjectRest } from "../testData/ActivateProjectRest";
import { UpdatePOWithTranslation } from "../testData/UpdatePOWithTranslation";
import { AttachmentHandler } from "./attachmentHandler";
import { CreatePOWithCommentariesRest } from "../testData/CreatePOWithCommentariesRest";

const updatePOWithRelated = new UpdatePOWithRelated();
const addPORelation = new AddPORelation();
const POhandler = new POHandler();
const helper = new Helper();
const projectHandler = new ProjectHandler();
const addGroupRest = new AddGroupRest();
const updatePOWithTranslation = new UpdatePOWithTranslation();
const attachmentHandler = new AttachmentHandler();

export class ProductOfferingHandler {

    async activateProject(projectId, user, pass){
        let activateProject = new ActivateProjectRest();
        await activateProject.performPost(projectId, user, pass);

        return [projectId];
    }

    async createBasicProjectAndPOAndPSWithDateOffset(user: string, pass: string, projectDaysOffset: number, poDaysOffset: number, psDaysOffset: number, translated = 'no') {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let start = Date.now();
        let helper = new Helper();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let arrayLanguages = ['en-US','pt-BR','ar','fr','es','sv','de','zh'];
        let poDateOffset = await helper.getEffectiveDateAddMinutesForTranslation(poDaysOffset);
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        console.log("Po date: "+poDateOffset);
        await project.performPostHoursOffset(projectId, user, pass, projectDaysOffset);
        await PS.performPostHoursOffset(PSId, projectId, user, pass, psDaysOffset);
        await PO.performPost(POId, PSId, projectId, poDateOffset, user, pass);
        if (translated == 'yes'){
            for (let i=0; i<arrayLanguages.length; i++) {
                let poTranslationName = arrayLanguages[i]+" po name";
                let poTranslationDesc = arrayLanguages[i]+" po description";
                await updatePOWithTranslation.updateTranslationForPONameAndPODesc(POId, projectId, poDateOffset, poTranslationName, poTranslationDesc, arrayLanguages[i], user, pass);
            }
        }
        return [projectId, PSId, POId, poDateOffset];
    }

    async createBasicProjAndPOAndPSWithDateOffsetWithAttachment (translated){
        let arrayLanguages = ['en-US','pt-BR','ar','fr','es','sv','de','zh'];
        let user = 'upadmin';
        let pass = 'upadmin';
        let basicTranslPo = null;
        basicTranslPo = await this.createBasicProjectAndPOAndPSWithDateOffset(user, pass, 300, 500 , 400, translated);
        let attachments = await attachmentHandler.create12Attachment(user, pass, basicTranslPo[0], basicTranslPo[2], basicTranslPo[3]);
        if (translated == 'yes'){
            for (let i=0; i<arrayLanguages.length; i++) {
                for (let j=0; j<attachments.length; j++) {
                    let attType = null;
                    if (j>3 && j<9) {
                        attType = 'media'
                        console.log("media "+arrayLanguages[i]+" "+attachments[j]);
                    } else {
                        attType = 'documents'
                        console.log("documents "+arrayLanguages[i]+" "+attachments[j]);
                    }
                    await updatePOWithTranslation.updateTranslationForPOAttachment(basicTranslPo[2], basicTranslPo[0], basicTranslPo[3], attachments[j], arrayLanguages[i]+" "+attachments[j], arrayLanguages[i], attType, user, pass);
                }
            }
        }

        return [basicTranslPo[0], basicTranslPo[1], basicTranslPo[2], basicTranslPo[3], attachments[0], attachments[1], attachments[2], attachments[3],
        attachments[4], attachments[5], attachments[6], attachments[7], attachments[8], attachments[9], attachments[10], attachments[11]];
    }

    async createDefinitionPOTwoDescTranslated(user: string, pass: string) {
        let project = new CreateProjectWithStartDateFutureRest();
        let createDescriptionForDefinitionPO = new CreatePOWithCommentariesRest();
        let helper = new Helper();
        let PS = new CreatePSRest();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let descriptionId1 = "ID_1_" + start;
        let descriptionId2 = "ID_2_" + start;
        let PODate = await helper.getDateForDescription(+3);
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        let psResponse = await PS.performPost(PSId, projectId, user, pass);
        let PSDate  = await psResponse[1];
        await createDescriptionForDefinitionPO.createPOWithDescTranslated(POId, PSId, projectId, descriptionId1, descriptionId2, PODate, PSDate, user, pass);

        return [projectId, POId, PODate];
      }


    async createBasicDefinitionOrActiveProjectPOAndPSWithDateOffsetAndPOEndDate(user: string, pass: string, projectDaysOffset: number, poDaysOffset: number, psDaysOffset: number, activate: boolean) {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let start = Date.now();
        let helper = new Helper();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let poDateOffset = null;
        let poEndDateOffset = await helper.getEffectiveDate(10);
        let psDateOffset = null;
        let projectDateOffset = await helper.getEffectiveDateAddMinutes(projectDaysOffset);
        // if the project, ps, po have same offset they must have same value
        // this logic is needed because the calculation of the offset could have a second difference that is not expected.
        if (projectDaysOffset == psDaysOffset) { 
            psDateOffset = projectDateOffset;
        } else {
            psDateOffset = await helper.getEffectiveDateAddMinutes(psDaysOffset);
        }

        if (projectDaysOffset == poDaysOffset) {
            poDateOffset = projectDateOffset;
        } else if (poDaysOffset == psDaysOffset) {
            poDateOffset = psDateOffset;
        } else {
            poDateOffset = await helper.getEffectiveDateAddMinutes(psDaysOffset);
        }
        
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        console.log("Po date: " + poDateOffset);
        await project.performPostWithDate(projectId, user, pass, projectDateOffset);
        await PS.performPostWithDate(PSId, projectId, user, pass, psDateOffset);
        await PO.performPostWithEndDate(POId, PSId, projectId, poDateOffset, poEndDateOffset, user, pass);

        if (activate) {
            await projectHandler.activateProject(projectId, user, pass);
        }
    
        return [projectId, PSId, POId, poDateOffset, poEndDateOffset];
      }

      async createBasicDefinitionOrActiveProjectPOAndPSWithDateOffset(user: string, pass: string, projectDaysOffset: number, poDaysOffset: number, psDaysOffset: number, activate: boolean) {
          let project = new CreateProjectRest();
          let PS = new CreatePSRest();
          let PO = new CreatePORest();
          let start = Date.now();
          let helper = new Helper();
          let projectId = "Proj_" + start;
          let PSId = "PS_" + start;
          let POId = "PO_" + start;
          let poDateOffset = null;
          let psDateOffset = null;
          let projectDateOffset = await helper.getEffectiveDateAddMinutes(projectDaysOffset);
          // if the project, ps, po have same offset they must have same value
          // this logic is needed because the calculation of the offset could have a second difference that is not expected.
          if (projectDaysOffset == psDaysOffset) { 
              psDateOffset = projectDateOffset;
          } else {
              psDateOffset = await helper.getEffectiveDateAddMinutes(psDaysOffset);
          }
  
          if (projectDaysOffset == poDaysOffset) {
              poDateOffset = projectDateOffset;
          } else if (poDaysOffset == psDaysOffset) {
              poDateOffset = psDateOffset;
          } else {
              poDateOffset = await helper.getEffectiveDateAddMinutes(psDaysOffset);
          }
          
          console.log(projectId);
          console.log(PSId);
          console.log(POId);
          console.log("Po date: " + poDateOffset);
          await project.performPostWithDate(projectId, user, pass, projectDateOffset);
          await PS.performPostWithDate(PSId, projectId, user, pass, psDateOffset);
          await PO.performPost(POId, PSId, projectId, poDateOffset, user, pass);
  
          if (activate) {
              await projectHandler.activateProject(projectId, user, pass);
          }
      
          return [projectId, PSId, POId, poDateOffset];
        }

    async createBasicProjectWithPOAndPSDefinition(poDate, user: string, pass: string) {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let projectDate = null;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        let projectResp = await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPost(POId, PSId, projectId, poDate, user, pass);
        projectDate = projectResp[1];

        return [projectId, PSId, POId, poDate, projectDate];
    }

    async createBasicProjectWithPOAndPSDefinitionWithEndDate(poDate, user: string, pass: string, endDate: Date) {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        let projectDate = null;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        let projectResp = await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPostWithEndDate(POId, PSId, projectId, poDate, endDate, user, pass);
        projectDate = projectResp[1];

        return [projectId, PSId, POId, poDate, projectDate];
    }

    async createBasicActiveProjectWithPOAndPS(poDate, user: string, pass: string) {
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePORest();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPost(POId, PSId, projectId, poDate, user, pass);
        await projectHandler.activateProject(projectId, user, pass);

        return [projectId, PSId, POId, poDate];
    }

    async createProjectWithPOWithAllCharacteristicsAndPSDefinition(user: string, pass: string) {
        let poDate = await helper.getEffectiveDate(+5);
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePoWithAllCharacteristicsTypes();
        let characId = await helper.generateId(5);
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPost(POId, PSId, projectId, poDate, user, pass, characId);

        return [projectId, PSId, POId, poDate, characId];
    }

    async createPOInsideProjectWithPS(projectId, PSId, date, user, pass, endDate: Date = null){
        let start = Date.now();
        let POId = "PO_" + start;
        await console.log('PO Id: ' + POId);
        let PO = new CreatePORest();
        if (endDate == null) {
            await PO.performPost(POId, PSId, projectId, date, user, pass);
        } else {
            await PO.performPostWithEndDate(POId, PSId, projectId, date, endDate, user, pass);
        }
        return [POId]
    }

    async createProjectWithExtraOffers(user: string, pass: string, numberOfExtraOffers: number, state: string = 'definition', withEndDate: boolean = false) {
        let date = await helper.getEffectiveDate(+5);
        let poEndDate = null;
        let createDefintionPO = null;
        if (withEndDate) {
            poEndDate = await helper.getEffectiveDate(+30);
            createDefintionPO = await this.createBasicProjectWithPOAndPSDefinitionWithEndDate(date, user, pass, poEndDate);
        } else {
            createDefintionPO = await this.createBasicProjectWithPOAndPSDefinition(date, user, pass);
        }
        let projectId = createDefintionPO[0];
        let PSId = createDefintionPO[1];
        let mainPOId = createDefintionPO[2];
        let projectDate = createDefintionPO[4];
        let POids =[];
        for (let a = 0; a < numberOfExtraOffers; a++) {
            let poId = await this.createPOInsideProjectWithPS(projectId, PSId, date, user, pass, poEndDate);
            POids.push(poId[0]);
        }
        if (state == 'active') {
            await projectHandler.activateProject(projectId, user, pass);
        }
        return [projectId, PSId, mainPOId, date, POids, projectDate, poEndDate];
    }

    async createActivePOWithGroup(user: string, pass: string, groupId: string, minCardinality: string, maxCardinality: string) {
        let start = await helper.getEffectiveDate(+5);
        let POtoAdd = await this.createBasicActiveProjectWithPOAndPS(start, user, pass);
        let poIdToAdd = await POtoAdd[2];
        start = await helper.getEffectiveDate(+6);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        await console.log(groupId);
        let group = await addGroupRest.performPost(projectId, POId, start, groupId, minCardinality, maxCardinality, poIdToAdd, user, pass);
        await projectHandler.activateProject(projectId, user, pass);
        return [projectId, POId, start, poIdToAdd, groupId];
    }

    async createDefinitionPOWithGroup(user: string, pass: string, groupId: string, minCardinality: string, maxCardinality: string) {
        let start = await helper.getEffectiveDate(+5);
        let POtoAdd = await this.createBasicActiveProjectWithPOAndPS(start, user, pass);
        let poIdToAdd = await POtoAdd[2];
        start = await helper.getEffectiveDate(+6);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        await console.log(groupId);
        let group = await addGroupRest.performPost(projectId, POId, start, groupId, minCardinality, maxCardinality, poIdToAdd, user, pass);
        return [projectId, POId, start, poIdToAdd, groupId];
    }

    async createDefinitionPOWithPORelated(user: string, pass: string) {
        let start = await helper.getEffectiveDate(+5);
        let POtoAdd = await this.createBasicActiveProjectWithPOAndPS(start, user, pass);
        let poIdToAdd = await POtoAdd[2];
        start = await helper.getEffectiveDate(+6);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        let relation = await addPORelation.performPost(projectId, POId, start, poIdToAdd, user, pass);
        return [projectId, POId, start, poIdToAdd];
    }

    async createActivePOWithPORelated(user: string, pass: string) {
        let start = await helper.getEffectiveDate(+5);
        let POtoAdd = await this.createBasicActiveProjectWithPOAndPS(start, user, pass);
        let poIdToAdd = await POtoAdd[2];
        start = await helper.getEffectiveDate(+6);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        let relation = await addPORelation.performPost(projectId, POId, start, poIdToAdd, user, pass);
        await projectHandler.activateProject(projectId, user, pass);
        return [projectId, POId, start, poIdToAdd];
    }

    async createDefinitionPOWithEmptyGroup(user: string, pass: string, groupId: string, minCardinality: string, maxCardinality: string) {
        let start = await helper.getEffectiveDate(+5);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        await console.log(groupId);
        let group = await addGroupRest.addEmptyGroup(projectId, POId, start, groupId, minCardinality, maxCardinality, user, pass);
        return [projectId, POId, start, groupId];
    }

    async createActivePOWithEmptyGroup(user: string, pass: string, groupId: string, minCardinality: string, maxCardinality: string) {
        let start = await helper.getEffectiveDate(+5);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        await console.log(groupId);
        let group = await addGroupRest.addEmptyGroup(projectId, POId, start, groupId, minCardinality, maxCardinality, user, pass);
        await projectHandler.activateProject(projectId, user, pass);
        return [projectId, POId, start, groupId];
    }

    async createPOWithOneRelation(user: string, pass: string, state: string) {
        let start = await helper.getEffectiveDate(+5);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let PSId = await currentProject[1];
        let POId = await currentProject[2];
        let relatedPOId = await this.createPOInsideProjectWithPS(projectId, PSId, start, user, pass);
        await updatePOWithRelated.performPatch(POId, relatedPOId[0], projectId, start, user, pass);
        if (state == 'active'){
            await projectHandler.activateProject(projectId, user, pass);
        }
        return [projectId, POId, start, relatedPOId[0]];
    }

    async createPOWithOneRelationFromAnotherProject(user: string, pass: string, state: string) {
        let start = await helper.getEffectiveDate(+5);
        let relatedPOId =await this.createBasicActiveProjectWithPOAndPS(start, user, pass);
        start = await helper.getEffectiveDate(+6);
        let currentProject = await this.createBasicProjectWithPOAndPSDefinition(start, user, pass);
        let projectId = await currentProject[0];
        let POId = await currentProject[2];
        await updatePOWithRelated.performPatch(POId, relatedPOId[2], projectId, start, user, pass);
        if (state == 'active'){
            await projectHandler.activateProject(projectId, user, pass);
        }
        return [projectId, POId, start, relatedPOId[2]];
    }

    async createProjectWithPOWithAllCharacAndPSDefAndTimeSlice(user: string, pass: string) {
        let poDate = await helper.getEffectiveDate(+5);
        let timeSliceDate = await helper.getEffectiveDate(+30);
        let project = new CreateProjectRest();
        let PS = new CreatePSRest();
        let PO = new CreatePoWithAllCharacteristicsTypes();
        let projectDef = new CreateProjectWithStartDateFutureRest();
        let timeSlice = new CreateTimeSliceRest();
        let activateProject = new ActivateProjectRest();
        let characId = await helper.generateId(5);
        let start = Date.now();
        let projectId = "Proj_" + start;
        let projectIdDef = "Proj_Def_" + start;
        let PSId = "PS_" + start;
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PS.performPost(PSId, projectId, user, pass);
        await PO.performPost(POId, PSId, projectId, poDate, user, pass, characId);
        await activateProject.performPost(projectId, user, pass);
        await projectDef.performPost(projectIdDef, user, pass);
        await timeSlice.performPost(POId, projectIdDef, timeSliceDate, user, pass);

        return [projectId, PSId, POId, poDate, characId, timeSliceDate];
    }

    async createProjectWithPOWithAllCharacteristicsReadOnly(user: string, pass: string, state: string,
        PSId: string = null, ReadOnlyOnExtension: boolean, ReadOnlyInNewVersions: boolean, READONLY: boolean) {
        let poDate = await helper.getEffectiveDate(+5);
        let start = Date.now();
        let project = new CreateProjectRest();
        let PO = new CreatePoWithAllCharacteristicsTypes();
        let characId = await helper.generateId(5);
        let projectId = "Proj_" + start;
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        if (PSId == null) {
            let PS = new CreatePSRest();
            PSId = "PS_" + start;
            await PS.performPost(PSId, projectId, user, pass);
        }

        await PO.performPost(POId, PSId, projectId, poDate, user, pass, characId, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);

        if (state == 'active') {
            let activateProject = new ActivateProjectRest();
            await activateProject.performPost(projectId, user, pass);
        }

        return [projectId, PSId, POId, poDate, characId];
    }

    async createNTimeSlice(user: string, pass: string, state: string, numberOfRequestedVersions: number, POId: string, projectId: string, initialDayOffSet: number) {
        const timeSlice = new CreateTimeSliceRest();
        let PODate = null;
        for (let a = 0; a < numberOfRequestedVersions; a++) {
            PODate = await helper.getEffectiveDate(initialDayOffSet + a);
            await timeSlice.performPost(POId, projectId, PODate, user, pass);
        }
        if (state == 'active') {
            await projectHandler.activateProject(projectId, user, pass);
        }

        return [projectId, POId, PODate];
    }
}