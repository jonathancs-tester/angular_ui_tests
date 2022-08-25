/**
* Creation Date: 06/30/2018
* Author: Andreivan P. dos Santos
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2018, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import { Config, browser } from 'protractor';
import { serverID, sidID, dbUserID, dbPassID } from '../Utils/ServerInfo';
import { CucumberReportExtension } from '../reporting/CucumberReportExtension';
export const SERVER= serverID;
export const SID= sidID;
export const DBUSER= dbUserID;
export const DBPASS= dbPassID;

const JSONREPORTS = process.cwd() + "/reports/json";

export let config: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ["../../features/*/*/*/*.feature"],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    baseUrl: `http://${SERVER}:8080`,
    //https://www.protractortest.org/#/async-await
    SELENIUM_PROMISE_MANAGER: false,
    // Protractor's uncaughtException listener registers first so it's fired before Cucumber's listener for the same event, which would normally handle whatever error occurred inside a step definition and gracefully fail the step.
    ignoreUncaughtExceptions: true,

    onPrepare: () => {
        CucumberReportExtension.createReportFile(JSONREPORTS);
        browser.manage().window().setSize(1800, 1200);
    },

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--no-sandbox']
        },
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: "json:./reports/json/cucumber_report.json",
        require: ['./*/*.js', '../hooks/*.js'],
    },

    onComplete: () => {
        CucumberReportExtension.generateCucumberReport();
    }
}