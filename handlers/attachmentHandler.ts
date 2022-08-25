/**
 * Creation Date: 26/03/2019
 * Author: Lucas Abritta Costa
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2019, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/


import { AddAttachments } from '../Utils/AddAtachment';
import { CreateAttachmentRest } from '../testData/createAttachmentRest';
import { AddAttachmentRest } from '../testData/addAttachmentRest';

const addAttachments = new AddAttachments()
const addAttachmentRest = new AddAttachmentRest();
const createAttachmentRest = new CreateAttachmentRest();

export module AttachmentTypes {
  export enum media {
    audio = 'A', 
    illustration = 'I',
    photo = 'P',
    text = 'T',
    video = 'V'
  };
  export enum document {
    userManualAttachment = 'userManualAttachment', 
    instructionAttachment = 'instructionAttachment',
    legalAttachment = 'legalAttachment',
    contract = 'contract'
  };
}

export class AttachmentHandler {
  async createDocumentAttachment(user: string, pass: string, projectId: any, poId: string, date: Date, 
      attachmentType: AttachmentTypes.document, attachmentMimeType: string, attachmentName: string, attachmentNameWithExtension: string, attachmentDir: string) {  
    let start = Date.now();
    let attachmentId = (attachmentName + "_" + start).substring(0,32);
    console.log(attachmentId);
    await createAttachmentRest.performPost(projectId, poId, user, pass, attachmentId, attachmentName, attachmentNameWithExtension, date, attachmentType, attachmentMimeType);
    await addAttachmentRest.performPost(projectId, poId, user, pass, attachmentDir, attachmentId);
    return [attachmentId, date];
  }

  async createMediaAttachment(user: string, pass: string, projectId: any, poId: string, date: Date,
      category: AttachmentTypes.media, attachmentName: string, attachmentNameWithExtension: string,  attachmentDir: string) {    
    let start = Date.now();
    let attachmentId = (attachmentName + "_" + start).substring(0,32);
    console.log(attachmentId);
    await createAttachmentRest.performPost(projectId, poId, user, pass, attachmentId, attachmentName, attachmentNameWithExtension, date, category);
    await addAttachmentRest.performPost(projectId, poId, user, pass, attachmentDir, attachmentId);
    return [attachmentId, date];
  }

  async create12Attachment(user: string, pass: string, projectId: any, poId: string, date: Date){
    const attachmentDocument = AttachmentTypes.document;
    const attachmentMedia = AttachmentTypes.media;

    const path = await require('path');
    let fileLocation = await path.resolve(__dirname, addAttachments.pdfLocation);
    let videoLocation = await path.resolve(__dirname, addAttachments.aviLocation);

    let mimeType = addAttachments.pdfMimeType;
    let fullName = addAttachments.pdfName;
    let fullVideoName = addAttachments.aviName;

    let userManualAttachmentType = attachmentDocument.userManualAttachment;
    let instructionAttachment = attachmentDocument.instructionAttachment;
    let legalAttachment = attachmentDocument.legalAttachment;
    let contract = attachmentDocument.contract;
    let userManualAttachmentResponse =  await this.createDocumentAttachment(user, pass, projectId, poId, date, userManualAttachmentType, mimeType, userManualAttachmentType, fullName, fileLocation);
    let instructionAttachmentResponse =  await this.createDocumentAttachment(user, pass, projectId, poId, date, instructionAttachment, mimeType, instructionAttachment, fullName, fileLocation);
    let legalAttachmentRsponse =  await this.createDocumentAttachment(user, pass, projectId, poId, date, legalAttachment, mimeType, legalAttachment, fullName, fileLocation);
    let contractResponse =  await this.createDocumentAttachment(user, pass, projectId, poId, date, contract, mimeType, contract, fullName, fileLocation);

    let audioType = attachmentMedia.audio;
    let illustration = attachmentMedia.illustration;
    let photo = attachmentMedia.photo;
    let text = attachmentMedia.text;
    let video = attachmentMedia.video;
    let audioResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, audioType, audioType, fullName, fileLocation);
    let illustrationResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, illustration, illustration, fullName, fileLocation);
    let photoResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, photo, photo, fullName, fileLocation);
    let textResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, text, text, fullName, fileLocation);
    let videoResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, video, video, fullVideoName, videoLocation);

    
    let userManualAttachmentResponse1 =  await this.createDocumentAttachment(user, pass, projectId, poId, date, userManualAttachmentType, mimeType, userManualAttachmentType + '1', fullName, fileLocation);
    let userManualAttachmentResponse2 =  await this.createDocumentAttachment(user, pass, projectId, poId, date, userManualAttachmentType, mimeType, userManualAttachmentType + '2', fullName, fileLocation);
    let userManualAttachmentResponse3 =  await this.createDocumentAttachment(user, pass, projectId, poId, date, userManualAttachmentType, mimeType, userManualAttachmentType + '3', fullName, fileLocation);

    var response = [userManualAttachmentResponse[0], instructionAttachmentResponse[0], legalAttachmentRsponse[0], contractResponse[0], 
                    audioResponse[0], illustrationResponse[0], photoResponse[0], textResponse[0], videoResponse[0],
                    userManualAttachmentResponse1[0], userManualAttachmentResponse2[0], userManualAttachmentResponse3[0]];
    return response;
  }

  async createMp4Attachment(user: string, pass: string, projectId: any, poId: string, date: Date){
    const attachmentMedia = AttachmentTypes.media;

    const path = await require('path');
    let videoLocation = await path.resolve(__dirname, addAttachments.mp4Location);

    let fullVideoName = addAttachments.mp4Name;

    let video = attachmentMedia.video;
    let videoResponse =  await this.createMediaAttachment(user, pass, projectId, poId, date, video, video, fullVideoName, videoLocation);

    return videoResponse;
  }

  async createPdfAttachment(user: string, pass: string, projectId: any, poId: string, date: Date){
    const attachmentDocument = AttachmentTypes.document;

    const path = await require('path');
    let fileLocation = await path.resolve(__dirname, addAttachments.pdfLocation);

    let mimeType = addAttachments.pdfMimeType;
    let fullName = addAttachments.pdfName;

    let userManualAttachmentType = attachmentDocument.userManualAttachment;
    let userManualAttachmentResponse =  await this.createDocumentAttachment(user, pass, projectId, poId, date, userManualAttachmentType, mimeType, userManualAttachmentType, fullName, fileLocation);

    return userManualAttachmentResponse;
  }
}