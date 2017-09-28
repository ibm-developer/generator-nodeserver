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
const services= require('./services/services');

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

    /* Do this so there are no overwrite messages when
       subgenerators run. The overwrites are expected
       by design. 
    */
    this.conflicter.force = true;
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

    let choseCloudServices= function(answers) {
      return answers.addCloudServices;
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
      validate: swaggerFileValidator,
    });
    prompts.push({
      type: 'confirm',
      name: 'addCloudServices',
      message: 'Add IBM Cloud Service Enablement?',
      default: false
    });
    prompts.push({
      type: 'checkbox',
      name: 'services',
      message: 'Choose IBM Cloud Services',
      when: choseCloudServices, 
      choices: services.SERVICE_CHOICES
    });
    return this.prompt(prompts).then(this._processAnswers.bind(this));
  }
  
  configuring() {}

  _processAnswers(answers) {

    this.opts.bluemix.backendPlatform = 'NODE';
    this.opts.bluemix.name = answers.name || this.opts.bluemix.name;
    answers.swaggerFileName = answers.swaggerFileName.trim();
    
    if ( answers.swaggerFileName.length > 0 && answers.swaggerFileName !== "None" ) {  
      let swagger = fs.readFileSync(answers.swaggerFileName,"utf8"); 
      this.opts.bluemix.openApiServers= [{"spec": swagger }]; 
    }

    this._processServices(answers);
    this._composeSubGenerators(); 
  }

  // store specified option in bluemix object to drive generator-ibm-service-enablement
  _storeServiceName(service) {
    let service_name= services.SERVICES[services.SERVICE_LABELS.indexOf(service)];
    let service_data= require("./services/"+service_name);
    this.opts.bluemix[service_name]= service_data[service_name]; 
  }

  // process each service selected by user 
  _processServices(answers) { 
     
    if ( answers.services ) { 
      this.hasServices= true; 
      answers.services.forEach(this._storeServiceName.bind(this));
    } 
    else { 
      this.hasServices= false;
    }
  }

  _composeSubGenerators() { 

    this.opts.bluemix.quiet= true; // suppress version messages

    if (process.env.YO_SUB_GEN_MODE === 'global') {
      // for develop-mode testing
      this.composeWith('ibm-core-node-express', this.opts);
      this.composeWith('ibm-cloud-enablement', this.opts);

      if ( this.hasServices ) { 
        this.composeWith('ibm-service-enablement', {
          bluemix: JSON.stringify(this.opts.bluemix), 
          spec: JSON.stringify(this.opts.spec),
          starter: "{}",
          quiet: true});
      } 
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

      if ( this.hasServices ) {
        this.composeWith(
          path.join(modDirName,'generator-ibm-service-enablement','generators','app'), 
          {
            bluemix: JSON.stringify(this.opts.bluemix), 
            spec: JSON.stringify(this.opts.spec),
            starter: "{}",
            quiet: true 
          }); 
      }
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
