/**
 * Creation Date: 30/01/2019
 * Author: Andreivan P. dos Santos
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

import { CreateProjectRest } from "../testData/CreateProjectRest";
import { CreatePODevice } from "../testData/CreatePODevice";
import { ProjectHandler } from "./ProjectHandler";
import { Helper } from "../Utils/Helpers/Helper";
import { CreateTimeSliceRest } from "../testData/CreateTimeSliceRest";
import { UpdatePOWithTranslation } from "../testData/UpdatePOWithTranslation";
import { AttachmentHandler } from "./attachmentHandler";

export class ProductOfferingDeviceHandler {

    async createProjPODevice(POName, deviceDesc, poDate, user, pass, state) {
        let project = new CreateProjectRest();
        let PO = new CreatePODevice();
        let activeProj = new ProjectHandler();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "DeviceGeneric";
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PO.createDeviceBasicPS(POId, PSId, POName, deviceDesc, projectId, poDate, user, pass);
        if (state == 'active'){
            await activeProj.activateProject(projectId, user, pass);
        }

        return [projectId, POId, poDate, POName];
    }

    async createProjPODeviceWithTwoDesc(POName, deviceDesc, poDate, user, pass, state) {
        let project = new CreateProjectRest();
        let PO = new CreatePODevice();
        let activeProj = new ProjectHandler();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "DeviceGeneric";
        let POId = "PO_" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PO.createDeviceBasicPSWithTwoDesc(POId, PSId, POName, deviceDesc, projectId, poDate, user, pass);
        if (state == 'active'){
            await activeProj.activateProject(projectId, user, pass);
        }

        return [projectId, POId, poDate, POName];
    }

    async createProjPODeviceWithAttachment(date, translated) {
        const updatePOWithTranslation = new UpdatePOWithTranslation();
        const attachmentHandler = new AttachmentHandler();
        let arrayLanguages = ['en-US','pt-BR','ar','fr','es','sv','de','zh'];
        let user = 'upadmin';
        let pass = 'upadmin';
        let basicTranslPo = null;
        basicTranslPo = await this.createProjPODevice('Device Translation', 'Device Translation Desc', date, user, pass, 'definition');
        let attachments = await attachmentHandler.create12Attachment(user, pass, basicTranslPo[0], basicTranslPo[1], basicTranslPo[2]);
        if (translated == 'yes'){
            for (let i=0; i<arrayLanguages.length; i++) {
               for (let j=0; j<attachments.length; j++) {
               let attType = null;
                    if (j>3 && j<9) {
                        attType = 'media'
                        // console.log("media "+arrayLanguages[i]+" "+attachments[j]);
                    } else {
                        attType = 'documents'
                        // console.log("documents "+arrayLanguages[i]+" "+attachments[j]);
                    }
                   await updatePOWithTranslation.updateTranslationForPOAttachment(basicTranslPo[1], basicTranslPo[0], basicTranslPo[2], attachments[j], arrayLanguages[i]+" "+attachments[j], arrayLanguages[i], attType, user, pass);
               }
            }
        }

        return [basicTranslPo[0], basicTranslPo[1], basicTranslPo[2], basicTranslPo[3], attachments[0], attachments[1], attachments[2], attachments[3],
        attachments[4], attachments[5], attachments[6], attachments[7], attachments[8], attachments[9], attachments[10], attachments[11]];

    }

    async createProjPOWithTwoDevices(POName, POName2, deviceDesc, deviceDesc2, poDate, user, pass) {
        let project = new CreateProjectRest();
        let PO = new CreatePODevice()
        let start = Date.now();
        let projectId = "Proj_" + start;
        let PSId = "DeviceGeneric";
        let POId = "PO_" + start;
        let POId2 = "PO_2" + start;
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PO.createDeviceBasicPS(POId, PSId, POName, deviceDesc, projectId, poDate, user, pass);
        await PO.createDeviceBasicPS(POId2, PSId, POName2, deviceDesc2, projectId, poDate, user, pass);

        return [projectId, POId, poDate];
    }

    async createProjActivePlusTimeSlicePOWithDevice(POName, deviceDesc, poDate, user, pass) {
        let project = new CreateProjectRest();
        let PO = new CreatePODevice();
        let activeProj = new ProjectHandler();
        let timeSlice = new CreateTimeSliceRest();
        let helper = new Helper();
        let start = Date.now();
        let projectId = "Proj_" + start;
        let projectIdDef = "ProjDef_" + start;
        let PSId = "DeviceGeneric";
        let POId = "PO_" + start;
        let timeSliceDate = await helper.getEffectiveDate(+30);
        console.log(projectId);
        console.log(PSId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PO.createDeviceBasicPS(POId, PSId, POName, deviceDesc, projectId, poDate, user, pass);
        await activeProj.activateProject(projectId, user, pass);
        await project.performPost(projectIdDef, user, pass);
        await timeSlice.performPost(POId, projectIdDef, timeSliceDate, user, pass, POName);

        return [projectId, POId, poDate];
    }

    async createProjPOWithDevicAllSupportedType(POName, poDate, user, pass, state: string = null, ReadOnlyOnExtension: boolean = false, ReadOnlyInNewVersions: boolean = false, READONLY: boolean = false) {
        const projectHandler = new ProjectHandler();
        let project = new CreateProjectRest();
        let PO = new CreatePODevice();
        let start = Date.now();
        let help = new Helper();
        let projectId = "Proj_" + start;
        let POId = "PO_" + start;
        let PSId = "DeviceGeneric";
        let characPrefix = await help.generateId(5);
        console.log(projectId);
        console.log(POId);
        await project.performPost(projectId, user, pass);
        await PO.createDeviceWithoutPSAllSupportedKindOfCharac(POId, POName, projectId, characPrefix, poDate, user, pass,
                                                                PSId, ReadOnlyOnExtension, ReadOnlyInNewVersions, READONLY);
        if (state == 'active') {
            await projectHandler.activateProject(projectId, user, pass);
        }

        return [projectId, POId, poDate, characPrefix];
    }

}