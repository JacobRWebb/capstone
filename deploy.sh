#!/bin/sh

ssh -tt root@xodius.io <<-'ENDSSH'
  cd ~/Capstone
  docker stop capstone-frontend
  docker rm capstone-frontend
  docker pull jacobwebb/capstone:latest
  docker run --name capstone-frontend -p 3000:3000 -d jacobwebb/capstone:latest
  exit
ENDSSH