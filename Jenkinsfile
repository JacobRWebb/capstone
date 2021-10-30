pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'cd /'
        sh 'rm -R tmp/'
        sh 'docker container prune --filter "dangling=true"'
        sh 'docker image prune --filter "dangling=true"'
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
        script {
          sh('chmod +x deploy.sh && ./deploy.sh')
        }
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