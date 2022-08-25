/**
 * Creation Date: 06/09/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/


import { CreateCharacteristicGroupRest } from '../testData/CreateCharacteristicGroupRest';

export class CharacteristicHandler {
  async createCharacteristicGroup(user: string, pass: string, projectId: string, POId: string, sequence: number, PODate, groupName: string) {
    let characteristic = new CreateCharacteristicGroupRest();
    let start = Date.now();
    let groupId = 'group_' + start;
    console.log(groupId);
    await characteristic.performPatch(projectId, POId, user, pass, sequence, PODate, groupId, groupName);

    return [groupId];
  }
}