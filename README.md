# E2E Offer Manager Test Suite

Welcome to the Offer Manager E2E test suite.Follows below the instructions for the configuration and installation of the project.

---

### Installing Node.js and npm

Note: We assume that the GIT is installed in the machine. If not please refer to the [git](https://git-scm.com/) documentation.

1. Download and run Node.js installer if you do not have node installed on your machine - [Node.js](https://nodejs.org/en/download/)

1. On command prompt do `node -v` to make sure that the node got installed on the machine. Please close all instances of command prompt before you do this check.

    Command:

        node -v

    eg:

        node -v
        v8.9.3

1. Update npm

    Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.

    Commands:

    Linux:

        sudo npm install npm -g

    Windows:

        npm install npm -g

    Please notice that npm version 5.3.0 or above is required. Check if the correct version is installed.

    Command:

        npm -v

    eg:

        npm -v
        v5.6.0
---
## Install protractor and TypeScript globally

    npm install -g protractor
    npm install -g typescript


## ECM Standalone Configuration

### Automation Knowledge-Sharing
Video -> \\ESEKAVDAHP0111\share\  


### Running end-to-end tests

In order to run the E2E test successfully run the steps in the following order:

*  Cd into  Test code folder ->                                             C:\projects\lsv\coc-lsv\E2E_OfferManager    and run:
      
    npm start


* Start Web-driver :webdriver-manager start

* To run all scenarios run:
        Test/js/step/> protractor config.js

* To run specific scenarios:
        Add the tag @implementing and run:
        Test/js/step/> protractor config.js     --cucumberOpts.tags="@implementing"


#### Functional test reports

Running functional tests generates the following reports under the directory `/coc-lsv/E2E_OfferManager/Test/js/steps/reports/html/cucumber_reporter.html`:

1. HTML: Read friendly report.
1. XML: Report for CI purpose found in the directory named after the browser used to run the test.
1. Screenshots: Screenshots of failing tests used in the html report are saved in the `screenshots/` directory.


#### Before pushing changes (after making commit)

1. Rebase code

        git pull origin **BRANCH** --rebase

#### Push corrections after code review

1. Add changes

        git add **PATH**

1. Amend commit

        git commit --amend --no-edit

1. Push

        git push origin head:refs/for/**BRANCH**