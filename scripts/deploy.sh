#!/bin/sh

ssh -tt root@xodius.io <<-'ENDSSH'
  cd ~/Capstone
  docker stop capstone-frontend
  docker rm capstone-frontend
  docker pull jacobwebb/capstone:latest
  docker run jacobwebb/capstone:latest --name capstone-frontend -p 3000:3000
  exit
ENDSSH