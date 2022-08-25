/**
 * Creation Date: 30/07/2018
 * Author: Jéssica Souza Pivoto
 * <p/>
 * Developed by: Inatel Competence Center
 * Copyright 2018, COMPANY
 * All rights are reserved. Reproduction in whole or part is
 * prohibited without the written consent of the copyright owner.
*/

const { After, setDefaultTimeout } = require('cucumber');
import { browser } from 'protractor';
import { Before  } from 'cucumber';
import { Login } from '../Utils/Login';
import { DeleteProjectRest } from '../testData/DeleteProjectRest';
import { arrayDevices, clear } from '../steps/BUC9455/US9984';

var user = 'lisa';
var password = 'lisa';
var userback = 'upadmin';
var passback = 'upadmin';
var deleteProject = new DeleteProjectRest();
var arrayDelete;

setDefaultTimeout(500000);

Before('not @nohookslogin', async () => {
  let login = new Login();
  await login.performLogin(user, password);
});

After(async function (scenarioResult) {
  if (scenarioResult.status === 'failed') {
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, 'image/png');
  }
});

After('@tearDownUS9984', async function () {
  var clearArray = new clear();  
  arrayDelete = arrayDevices; 
  arrayDelete.forEach(async element => {
  if (arrayDelete.length != 0) {    
      await deleteProject.performDelete(element, userback, passback);         
  } 
  clearArray.clearArraProject();    
  }); 
});
