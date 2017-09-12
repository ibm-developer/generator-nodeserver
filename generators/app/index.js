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
const path = require('path');
const os = require('os');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // generate only for Node.js apps
    this.opts = {bluemix: {backendPlatform: 'NODE'}, spec: {applicationType: 'WEB'}};
  }

  initializing() {
    this.composeWith(require.resolve('../core'), this.opts);
    if (process.env.YO_SUB_GEN_MODE === 'global') {
      this.composeWith('ibm-cloud-enablement', this.opts);
    }
    else { 
      const modDirName = __dirname + '/../../node_modules';
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

  prompting() {
    const prompts = [];

    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: path.basename(process.cwd()),
    });
    prompts.push({
      type: 'input',
      name: 'dockerRegistry',
      message: 'Docker Registry (space for none)',
      default: 'registry.ng.bluemix.net/' + os.userInfo().username,
    });

    return this.prompt(prompts).then(this._processAnswers.bind(this));
  }

  configuring() {}

  _processAnswers(answers) {
    this.opts.bluemix.backendPlatform = 'NODE';
    this.opts.bluemix.name = answers.name || this.opts.bluemix.name;
    answers.dockerRegistry = answers.dockerRegistry.trim();
    this.opts.bluemix.dockerRegistry =
      answers.dockerRegistry.length > 0 ? answers.dockerRegistry : '';
  }
};
