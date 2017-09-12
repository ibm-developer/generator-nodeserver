#!/usr/bin/env bash

set -ev

if [[ "${TRAVIS_PULL_REQUEST}" = "false" ]]; then
    echo "Not a Pull Request build. Proceeding."

    # On development branch, we want to auto increment package patch version number
    # and push commit back to repo
    if [[ "${TRAVIS_BRANCH}" = "development" ]]; then
        echo "On development branch"
        echo "Commit message: ${TRAVIS_COMMIT_MESSAGE}"

        if [[ "${TRAVIS_COMMIT_MESSAGE}" ==  "[Travis - npm version patch]"* ]]; then
            echo "This is a version increment commit. Doing nothing."
        else
            echo "Incrementing patch version and pushing back to repo."

            echo "commit: ${TRAVIS_COMMIT}"
            USER_EMAIL=$(git --no-pager show -s --format='%ae' "${TRAVIS_COMMIT}")
            USER_NAME=$(git --no-pager show -s --format='%an' "${TRAVIS_COMMIT}")
            echo "user email: ${USER_EMAIL}"
            echo "user name: ${USER_NAME}"
            git config user.email "${USER_EMAIL}"
            git config user.name "${USER_NAME}"

            git checkout -- .
            git checkout -b increment-patch-version
            npm version patch -m "[Travis - npm version patch] Increment package version to %s"

            git branch --set-upstream-to origin/development
            git push $GITHUB_URL_SECURED HEAD:development
            git push $GITHUB_URL_SECURED HEAD:development --tags
        fi
    fi
else
    echo "This is a Pull Request build. Doing nothing."
fi