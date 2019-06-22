pipeline {
    agent any
    stages {
      def image
      sh 'echo hi'
        stage('Build') {
            image = docker.Build("efrat19/slackapp:${env.BUILD_ID}","./upstream -f upstream/Dockerfile")
        }

        stage('push') {
            image.push()
        }
  }
}