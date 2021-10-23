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
        sh 'chmod a+x ${env.WORKSPACE}/../${env.JOB_NAME}@tmp/deploy.sh'
        sh '${env.WORKSPACE}/../${env.JOB_NAME}@tmp/deploy.sh'
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