/*
 Copyright 2017 IBM Corp.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

'use strict';

const Generator = require('yeoman-generator');
const Bundle = require("../../package.json");
const Log4js = require('log4js');
const logger = Log4js.getLogger("generator-nodeserver");
const path = require('path');
const fs = require('fs');

const OPTION_BLUEMIX = 'bluemix';
const OPTION_STARTER = 'starter';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    logger.level= "info";
    logger.info("Package info ::", Bundle.name, Bundle.version);

    if ( typeof this.options.bluemix == "undefined" ) { 
      // generate only for Node.js apps
      this.opts = {bluemix: {backendPlatform: 'NODE'}, spec: {applicationType: 'WEB'}};
    }
    else { 
      
      this._sanitizeOption(this.options, OPTION_BLUEMIX);
      this._sanitizeOption(this.options, OPTION_STARTER);
      
      this.opts = opts;
      
    }
  }

  initializing() {
  }

  prompting() {
    
    let swaggerFileValidator= function(str) {  
      if ( str == "None" ) {
        return true;
      }
      else {  
        if ( fs.existsSync(str.trim()) ) { 
          return true; 
        } 
        else { 
          console.log("\n"+str+" not found.");
          return false;
        } 
      }    
    }

    let prompts = [];
    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: path.basename(process.cwd())
    });
    prompts.push({
      type: 'input',
      name: 'swaggerFileName',
      message: 'OpenAPI Document',
      default: "None",
      validate: swaggerFileValidator 
    });
    return this.prompt(prompts).then(this._processAnswers.bind(this));

  }
  
  configuring() {}

  _processAnswers(answers) {

    this.opts.bluemix.backendPlatform = 'NODE';
    this.opts.bluemix.name = answers.name || this.opts.bluemix.name;
    answers.swaggerFileName = answers.swaggerFileName.trim();
    if ( answers.swaggerFileName.length > 0 && answers.swaggerFileName !== "None" ) {  
      let rawdata = fs.readFileSync(answers.swaggerFileName);  
      let swaggerJson = JSON.parse(rawdata)
      this.opts.bluemix.openApiServers= [{"spec": JSON.stringify(swaggerJson) }]; 
    }

    this._composeSubGenerators(); 
  }

  _composeSubGenerators() { 

    this.opts.bluemix.quiet= true; // suppress version messages

    if (process.env.YO_SUB_GEN_MODE === 'global') {
      // for develop-mode testing
      this.composeWith('ibm-core-node-express', this.opts);
      this.composeWith('ibm-cloud-enablement', this.opts);
    }
    else { 
      const modDirName = __dirname + '/../../node_modules';
      this.composeWith(
        path.join(
          modDirName,
          'generator-ibm-core-node-express',
          'app'
        ),
        this.opts
      ); 
      this.composeWith(
        path.join(
          modDirName,
          'generator-ibm-cloud-enablement',
          'generators',
          'app'
        ),
        this.opts
      );  
    }
  }

  _sanitizeOption(options, name) {

    try {
      this.options[name] = typeof (this.options[name]) === 'string' ? 
        JSON.parse(this.options[name]) : this.options[name];
    } catch (e) {
      throw Error(`${name} parameter is expected to be a valid stringified JSON object`);
    }
  }

};
