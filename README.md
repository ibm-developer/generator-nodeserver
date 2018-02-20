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

[img-travis-master]: https://travis-ci.org/ibm-developer/generator-nodeserver.svg?branch=development
[url-travis-master]: https://travis-ci.org/ibm-developer/generator-nodeserver/branches

[img-coveralls-master]: https://coveralls.io/repos/github/ibm-developer/generator-nodeserver/badge.svg
[url-coveralls-master]: https://coveralls.io/github/ibm-developer/generator-nodeserver

[img-codacy]: https://api.codacy.com/project/badge/Grade/a5893a4622094dc8920c8a372a8d3588?branch=master
[url-codacy]: https://www.codacy.com/app/ibm-developer/generator-nodeserver


## Overview

This generator produces an Express-based Node.js server project with all the ingredients you need for a good start at building a cloud native application. You can choose between either a simple web app or microservice pattern. Combine the microservice pattern with a web app for a
[backend-for-frontend](http://samnewman.io/patterns/architectural/bff/) pattern.

Bring your own optional [Swagger document](https://swagger.io/) to direct code generation for top-down development.

### Monitoring and Health

The generated projects are pre-wired for monitoring and health checks. The app includes

1. [app metrics dashboard](https://www.npmjs.com/package/appmetrics-dash)

1. [Prometheus endpoint](https://www.npmjs.com/package/appmetrics-prometheus)

1. [Kubernetes http liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)

### Deployment Enablement  

The generated projects include deployment configuration for the following environments:

1. Docker

    The projects include Docker files to build images for both release and development

1. Kubernetes

    The projects include a Helm chart for deployment to Kubernetes.

1. Cloud Foundry

    The projects include a manifest for deployment to Cloud Foundry.

1. Dev-ops Pipeline

    The projects include a toolchain and pipeline definition for CI/CD deployment to the IBM Cloud.

## Special Tools

The projects include NPM scripts to install and run [IBM Cloud Developer Tools](https://github.com/IBM-Bluemix/ibm-cloud-developer-tools).

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

### Prompting

When you run 'yo nodeserver', it will prompt you for the following:

1. project name

    Specify the project name. It defaults to the current directory name.  This is a required value.

1. Swagger doc file name

    Specify the relative or absolute file name of a Swagger document to direct the project's code generation. A route stub will be scaffolded and registered for each route defined in the swagger document. This is an optional value.

1. IBM Cloud Service Enablement.

    Specify Y|N whether or not you want to scaffold IBM Cloud service enablement into your project.  If you specify 'Y', you will be able to select one or more services from a checklist. For each service you select,configuration and access scaffolding code is generated.  IBM Cloud service enablement is optional.

### Headless mode (without prompting)
Use headless mode to create an app without having to use the UI. This is useful when you want to use this generator to build a project by only running a script instead of interactively.

To create an app using the default options run the command:

```bash
yo nodeserver --headless
```
Defaults:
* Name: the current working directory.
* SwaggerFileName: false.
* Services: false.

#### Headless usage
To specify the name of the project use:
```bash
yo nodeserver --headless='{"name":"your-app-name"}'
```

To specify which services to add use:
```bash
yo nodeserver --headless='{"service":["service1", "service2"]}'
```
For valid services see below.

Full usage:
```bash
yo nodeserver --headless='{"name":"your-app-name","swaggerFileName":"your-swagger-file-name","service":["service1", "service2"]}'
```

#### Valid Services
* 'alert'
* 'appid'
* 'cloudant'
* 'mongo'
* 'object storage'
* 'postgre'
* 'push'
* 'redis'
* 'watson conversation'

## Project Build/Run

Build your generated project one of two ways:

1. Normal, `npm install`, `npm start`  
1. Containerized, using [IBM Cloud Developer Tools](https://github.com/IBM-Bluemix/ibm-cloud-developer-tools)

    Note that a containerized approach is supported through the tooling in special consideration of Kubernetes as a deployment environment, following the dev/prod parity principle of [12 Factor Apps](12factor.net).

    There are npm scripts to simplify this for you:

    1. `npm install`

    1. `npm run idt:install`

        Installs IBM Cloud Developer Tools.

    1. `npm run idt:build`

        Builds Docker image for dev mode and does npm install, including dev dependencies.

    1. `npm run  idt:test`

        Runs project unit tests in dev mode Docker container.

    1. `npm run idt:debug`

        Runs the project in debug mode in the dev mode Docker container. The app will start and listen on port 5858 by default for a debug client to attach and take control.

    1. `npm run idt:run`

        Runs the project in the release mode Docker container.  The release mode Docker container is built without dev dependencies - i.e. with NODE_ENV set to production.

## Project Deployment

### Docker

Build a Docker image and run project in a Docker container using Docker commands in the project root directory:

1. `docker build -t my-image .`
1. `docker run -p 3000:3000 --name my-container my-image`

Stop and optionally remove the container and image with the following commands:

1. `docker stop my-container`
1. `docker rm my-container`
1. `docker rmi my-image`

### Kubernetes Deployment

Deploy to Kubernetes using Helm or the IBM Cloud Developer Tools.

1. Helm

    1. Push your image to a Docker image accessible to your Kubernetes environment, such as [Docker Hub](dockerhub.com) or your company's private image registry.

    1. Install your project from the project's root directory, using the included Helm chart:

        helm install chart/`<project name>` --name=`<release name>` --set image.repository=`<image name>` --set image.tag=`<tag value>` --set image.pullPolicy=`<pull policy>`

        Where:

        - `<project name>`

            The name you gave to your project when you generated it.

        - `<release name>`

            An arbitrary name you give to this install instance.

        - `<image name>`

            The registry/image name of your release Docker image - e.g.
            'registry.ng.bluemix.net/myspace/myimage'

        - `<tag value>`

            The image tag value of your release Dockerimage - e.g. 'latest' or '1.0.0'

        - `<pull policy>`

            'Always' or 'IfNotPresent'.  See [Kubernetes image documentation](https://kubernetes.io/docs/concepts/containers/images/) for further explanation.

    Notes:  
    1. If the `helm install` command above gives you an error about not finding 'tiller', execute `helm init --upgrade`.

    1. The helm command installs to the Kubernetes environment pointed to by the KUBECONFIG environment variable. Make sure you are in configuration mode for your Kubernetes cluster.

    1. The Helm command is installed when you install the IBM Cloud Developer Tools, which you can install for your project by running `npm run idt:install`.
    
    1. To delete the helm deployment, execute `helm del --purge <release name>`.

1. IBM Cloud Developer Tools

    `npm run idt:deploy -- --target container`

    Notes:

    1. The idt tool will prompt for registry/image name, then push your image and install your Helm chart to the Kubernetes environment pointed to by your KUBECONFIG environment variable.

    1. For IBM Cloud, set KUBECONFIG using the 'bx cs cluster-config `<cluster name>` command.  Note this command is installed as part of IBM Cloud Developer Tools, which you can install for your project by running 'npm run idt:install'

### Clound Foundry Deployment

1. Add a host entry to the "manifest.yml" file (Ex. `host: my-app-name`).

1. cf push

   Note: if you installed IBM Cloud Developer Tools using the 'npm run idt:install' command, you can run the 'bx cf push' command. Otherwise, install the cf command from [Pivotal](https://docs.run.pivotal.io/cf-cli/install-go-cli.html).

1. IBM Cloud Developer Tools

    npm run idt:deploy

    This was installed using your project's 'npm run idt:install' script.

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
