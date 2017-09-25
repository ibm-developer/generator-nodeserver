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
/**
 * Contains helper code that is used by the tests.
 */
'use strict';

// Paths to the generated files, if you move files around change paths here.
exports.file = {
  gitignore: '.gitignore',
  dockerignore: '.dockerignore',
  package_json: 'package.json',
  README_md: 'README.md',
  server_js: 'server/server.js',
  index_html: 'public/index.html',
  local: 'server/config/local.json',
  health: 'server/routers/health.js',
  index_router: 'server/routers/index.js',
  public: 'server/routers/public.js',
  index_service: 'server/services/index.js',
  cliconfig: 'cli-config.yml'
};

exports.fileSwagger = {
  gitignore: '.gitignore',
  dockerignore: '.dockerignore',
  package_json: 'package.json',
  README_md: 'README.md',
  server_js: 'server/server.js',
  persons_js: "server/routers/persons.js",
  dinosaurs_js: "server/routers/dinosaurs.js",
  local: 'server/config/local.json',
  health: 'server/routers/health.js',
  index_router: 'server/routers/index.js',
  index_service: 'server/services/index.js',
  cliconfig: 'cli-config.yml'
};

// Default port defined in app/index.js.
exports.defaultPort = 3000;

// The npm start command.
exports.npmStart = "node server.js";
