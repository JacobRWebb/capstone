pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t jacobwebb/capstone:latest .'
      }
    }

    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }

    stage('Push') {
      steps {
        sh 'docker push jacobwebb/capstone:latest'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cd ./script'
        sh 'chmod a+x deploy.sh'
        sh 'deploy.sh'
      }
    }

    stage('Post') {
      steps {
        sh 'docker logout'
      }
    }

  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker')
  }
}