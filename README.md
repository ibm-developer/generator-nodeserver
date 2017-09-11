# IBM Cloud Enablement Generator

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
[url-npm]: https://www.npmjs.com/package/generator-ibm-cloud-enablement
[img-license]: https://img.shields.io/npm/l/generator-ibm-cloud-enablement.svg
[img-version]: https://img.shields.io/npm/v/generator-ibm-cloud-enablement.svg
[img-npm-downloads-monthly]: https://img.shields.io/npm/dm/generator-ibm-cloud-enablement.svg
[img-npm-downloads-total]: https://img.shields.io/npm/dt/generator-ibm-cloud-enablement.svg

[img-travis-master]: https://travis-ci.org/ibm-developer/generator-ibm-cloud-enablement.svg?branch=master
[url-travis-master]: https://travis-ci.org/ibm-developer/generator-ibm-cloud-enablement/branches

[img-coveralls-master]: https://coveralls.io/repos/github/ibm-developer/generator-ibm-cloud-enablement/badge.svg
[url-coveralls-master]: https://coveralls.io/github/ibm-developer/generator-ibm-cloud-enablement

[img-codacy]: https://api.codacy.com/project/badge/Grade/a5893a4622094dc8920c8a372a8d3588?branch=master
[url-codacy]: https://www.codacy.com/app/ibm-developer/generator-ibm-cloud-enablement

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
Do a pull request against master, once that PR is reviewed and merged, a new version will be published.

