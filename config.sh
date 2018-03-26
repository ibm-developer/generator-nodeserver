#!/usr/bin/env bash

CMD=$(cat .git/config | grep "commit")
if [ -z $CMD ]; then
   echo "$(cat .git/config)\n$(cat .gitconfig)" > ./.git/config
else
    echo "commit file template already saved"
fi
