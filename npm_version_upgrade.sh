#!/usr/bin/env bash

set -ev

echo "Auto version updating script : version 0.0.1"
echo "Checking if a new version update is required ..."
PKG_NAME=`node -e "console.log(require('./package.json').name);"`
export PKG_VER=`node -e "console.log(require('./package.json').version);"`
export NPM_VER=`npm show $PKG_NAME version`
echo "$PKG_NAME : version = $PKG_VER, npm version = $NPM_VER"
HTML=$(markdown CHANGELOG.md)

if [ $TRAVIS_BRANCH = "master" ]; then
    echo "Build targetting master - checking if this is a PR or not"
    if [[ "${TRAVIS_PULL_REQUEST}" = "false" ]]; then
        echo "This is a build on master, performing additional steps"
        if [ $NPM_VER == $PKG_VER ]; then
             echo "Version numbers match, so changing version and committing changes"
             ./prerelease.sh
            retval=$?
            if [[ $retval != 0 ]]; then
                exit $retval
            fi
        else
            npm publish
            node /tmp/changelog-generator-slack-notification/index.js --html "$HTML" --name "$PKG_NAME" --api "$SLACK_WEBHOOK" --v "$PKG_VER"
        fi


    fi

fi