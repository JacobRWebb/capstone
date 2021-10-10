#!/bin/sh

ssh -tt root@xodius.io <<-'ENDSSH'
  cd ~/Capstone
  git stash push --include-untracked
  git pull https://github.com/JacobRWebb/capstone.git
  yarn
  pm2 start
  exit
ENDSSH