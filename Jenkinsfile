pipeline {
  agent {
    docker {
      image 'docker:dind'
    }
  }
  stages {
    stage('build') {
      steps {
        sh 'docker build . -t efrat19/rollbot'
      }
    }

    stage('login') {
      steps {
        sh 'docker login efrat19/rollbot'
      }
    }
    stage('push') {
      steps {
        sh 'docker push efrat19/rollbot'
      }
    }
  }
}