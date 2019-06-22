pipeline {
    agent any
    stages {
        stage('Build') {
            def image = docker.Build("efrat19/slackapp:${env.BUILD_ID}","./upstream -f upstream/Dockerfile")
        }

        stage('push') {
          script {
            image.push()
          }
        }
  }
}