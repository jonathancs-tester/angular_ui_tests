/**
 * Creation Date: 18/01/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/


import { CategoryHandler } from './CategoryHandler';
import { CreateProjectRest } from '../testData/CreateProjectRest';
import { ActivateProjectRest } from '../testData/ActivateProjectRest';
import { CreateRuleSpaceSpecRest } from '../testData/CreateRuleSpaceSpecRest';
import { CreateRuleSegmentRest } from '../testData/CreateRuleSegmentRest';
import { CreateRuleAssignmentRest } from '../testData/CreateRuleAssignmentRest';
import { CreateRuleMDRRest } from '../testData/CreateRuleMDRRest';
import { Helper } from '../Utils/Helpers/Helper';
import * as moment from 'moment';

const helper = new Helper();
const categoryHandler = new CategoryHandler();
const activateProjectRest = new ActivateProjectRest();
const createRuleSpaceSpecRest = new CreateRuleSpaceSpecRest();
const createRuleSegmentRest = new CreateRuleSegmentRest();
const createRuleAssignmentRest = new CreateRuleAssignmentRest();
const createRuleMDRRest = new CreateRuleMDRRest();
const attributeName = 'DSB_Attribute'; // imported

export class ProjectHandler {
    async createProject(user: string, pass: string, daysOffSet: number = 1) {
        let start = Date.now();
        let projectId = 'Proj_' + start;
        let project = new CreateProjectRest();
        console.log(projectId);
        let proj = await project.performPost(projectId, user, pass, daysOffSet);
        return [projectId, start, proj[1]];
    }

    async activateProject(projectId: any, user: string, pass: string) {
        await activateProjectRest.performPost(projectId.toString(), user, pass);
        return [projectId];
    }

    async createAndActivateProjectWithCategory(user: string, pass: string) {
        let proj = await this.createProject(user, pass);
        let category = await categoryHandler.createCategory(proj[0], user, pass);
        await this.activateProject(proj[0], user, pass);
        return [category[0], proj[0]];
    }

    async deleteProject(user: string, pass: string) {
        let proj = await this.createProject(user, pass);
        let category = await categoryHandler.createCategory(proj[0], user, pass);
        await this.activateProject(proj[0], user, pass);
        return [category[0], proj[0]];
    }

    async createProjectWithMarketSegment(user: string, pass: string) {
        let proj = await this.createProject(user, pass);
        let projectId = await proj[0].toString();
        let date = await proj[1];
        let spaceName = "spaceName_" + await helper.generateId(12);
        let personalInfo = "personalInfo_" + await helper.generateId(9);
        let ruleSegmentAPI = "ruleSegmentAPI_" + await helper.generateId(7);
        let ruleAssignment = "ruleAssignment_" + await helper.generateId(6);
        let ruleAssignment2 = ruleAssignment + '2';
        ruleAssignment += '1';
        let ruleMDRId = "ruleMDRId_" + await helper.generateId(12);

        await console.log("date: " + moment(date).format("YYYY-MM-DDTHH:MM:SS.000Z"));
        await console.log("projectId: " + projectId);
        await console.log("spaceName: " + spaceName);
        await console.log("personalInfo: " + personalInfo);
        await console.log("ruleSegmentAPI: " + ruleSegmentAPI);
        await console.log("ruleAssignment: " + ruleAssignment);
        await console.log("ruleAssignment2: " + ruleAssignment2);
        await console.log("ruleMDRId: " + ruleMDRId);

        let ruleSpace = await createRuleSpaceSpecRest.performPost(projectId, date, user, pass, attributeName, spaceName, personalInfo);
        let ruleSegment = await createRuleSegmentRest.performPost(projectId, date, user, pass, attributeName, spaceName, personalInfo, ruleSegmentAPI);
        let ruleAssignmentResponse = await createRuleAssignmentRest.performPost(projectId, date, user, pass, attributeName, personalInfo, ruleSegmentAPI, ruleAssignment, "Fabiana Resource", "FFF", false);
        let ruleAssignmentResponse2 = await createRuleAssignmentRest.performPost(projectId, date, user, pass, attributeName, personalInfo, ruleSegmentAPI, ruleAssignment2, "Angelo|Andreivan Resource",  "AS|AP", true);
        let ruleMDR = await createRuleMDRRest.performPost(projectId, date, user, pass, attributeName, spaceName, personalInfo, ruleSegmentAPI, ruleAssignment, ruleMDRId);

        await this.activateProject(projectId, user, pass);
        return [projectId, date, spaceName, personalInfo, ruleSegmentAPI, ruleAssignment, ruleAssignment2, ruleMDRId];
    }

}