#!/bin/sh

ssh -tt root@xodius.io <<-'ENDSSH'
  cd ~/Capstone
  git stash push --include-untracked
  git pull
  yarn
  pm2 start
  exit
ENDSSH