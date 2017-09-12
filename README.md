# NodeServer Generator

[![Bluemix powered][img-bluemix-powered]][url-bluemix]
[![Travis][img-travis-master]][url-travis-master]
[![Coveralls][img-coveralls-master]][url-coveralls-master]
[![Codacy][img-codacy]][url-codacy]
[![Version][img-version]][url-npm]
[![DownloadsMonthly][img-npm-downloads-monthly]][url-npm]
[![DownloadsTotal][img-npm-downloads-total]][url-npm]
[![License][img-license]][url-npm]

[img-bluemix-powered]: https://img.shields.io/badge/bluemix-powered-blue.svg
[url-bluemix]: http://bluemix.net
[url-npm]: https://www.npmjs.com/package/generator-nodeserver
[img-license]: https://img.shields.io/npm/l/generator-nodeserver.svg
[img-version]: https://img.shields.io/npm/v/generator-nodeserver.svg
[img-npm-downloads-monthly]: https://img.shields.io/npm/dm/generator-nodeserver.svg
[img-npm-downloads-total]: https://img.shields.io/npm/dt/generator-nodeserver.svg

[img-travis-master]: https://travis-ci.org/ibm-developer/generator-nodeserver.svg?branch=master
[url-travis-master]: https://travis-ci.org/ibm-developer/generator-nodeserver/branches

[img-coveralls-master]: https://coveralls.io/repos/github/ibm-developer/generator-nodeserver/badge.svg
[url-coveralls-master]: https://coveralls.io/github/ibm-developer/generator-nodeserver

[img-codacy]: https://api.codacy.com/project/badge/Grade/a5893a4622094dc8920c8a372a8d3588?branch=master
[url-codacy]: https://www.codacy.com/app/ibm-developer/generator-nodeserver


![](https://i.pinimg.com/564x/f9/28/e2/f928e27b6513d0d9c25a1b80293b12d1.jpg)

## Current State

This is an early version of the nodeserver generator.  It produces a simple Expressed-based node.js server that serves up a trivial page and exposes a health endpoint (/health).  Additionally, configuration files are generated for the following tools and deployment environments:

1. Docker
2. Kubernetes/Helm
3. Cloud Foundry
4. [IBM Cloud Developer Tools](https://github.com/IBM-Bluemix/ibm-cloud-developer-tools)

#### Prompting 

The generator presently prompts only for project name and docker registry (i.e. target for IDT's 'bx dev deploy' command).  Additional prompting is planned for IBM Cloud services, including Cloudant, ObjectStore, AppID, and more. 

## Pre-requisites

Install [Yeoman](http://yeoman.io)

```bash
npm install -g yo
```

## Installation

```bash
npm install -g generator-nodeserver
```
## Usage

```bash
yo nodeserver 
```

## Development

Clone this repository and link it via npm

```bash
git clone https://github.com/ibm-developer/generator-nodeserver
cd generator-nodeserver
npm link
```

In a separate directory invoke the generator via

```bash
yo nodeserver 
```

## Publishing Changes

In order to publish changes, you will need to fork the repository or ask to join the `ibm-developer` org and branch off the development branch.

Once you are finished with your changes, run `npm test` to make sure all tests pass.

Do a pull request against `development`, make sure the build passes. A team member will review and merge your pull request. 
Once merged to development, the version will be auto-incremented.
Do a pull request against master, once that PR is reviewed and merged, a new version will be published to npm.

