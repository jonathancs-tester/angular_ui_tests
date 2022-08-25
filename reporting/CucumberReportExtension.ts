/**
* Creation Date: 30/07/2018
* Author: Jéssica Souza Pivoto
* <p/>
* Developed by: Inatel Competence Center
* Copyright 2018, COMPANY
* All rights are reserved. Reproduction in whole or part is
* prohibited without the written consent of the copyright owner.
*/

import * as fs from 'fs';
import { mkdirp } from 'mkdirp';
import * as report from 'cucumber-html-reporter';
import { serverID } from '../Utils/ServerInfo';

export class CucumberReportExtension {
    //The static in the variable ensure that the value of the variable is always the same
    //unique for all of the class, an private modifies visibility, if private  only the class itself
    //can access the variable.
    private static jsonDir = process.cwd()+ "\\reports\\json";
    private static htmlDir = process.cwd()+ "\\reports\\html";
    private static jsonFile = CucumberReportExtension.jsonDir + "\\cucumber_report.json";

    public static cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: CucumberReportExtension.jsonFile,
        output: CucumberReportExtension.htmlDir + "\\cucumber_reporter.html",
        reportSuiteAsScenarios: true,
        metadata: {
            "App Version":"20.0",
            "Test Environment": "CI - "+`${serverID}`,
            "Browser": "Chrome  76",
            "Platform": "Windows 7",
            "Parallel": "Scenarios",
            "Executed": "CI server"
    }
};
/**
 * @description:method responsible for create report file
 * @param dirName: name of diretory
 */
    public static createReportFile (dirName) {
        if(!fs.existsSync(dirName))
            mkdirp.sync(dirName);
    }

/**
 * @description: method responsible for generate cucumber report
 */
    public static generateCucumberReport() {
        report.generate(this.cucumberReporterOptions);
    }
}

