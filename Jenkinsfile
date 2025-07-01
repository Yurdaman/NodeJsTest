pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'node -v'
                bat 'npm install'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm run test:unit'
            }
        }

        stage('Run End-to-End Tests') {
            steps {
                // Запускаем сервер в фоне
                bat 'start /b npm start'

                // Ждем ~5 секунд, используя ping вместо timeout
                bat 'ping 127.0.0.1 -n 6 > nul'

                // Запускаем e2e тесты
                bat 'npm run test:e2e'
            }
        }

        stage('Check for Broken Links') {
            steps {
                bat 'npm run check-links'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying to production...'
        //     }
        // }
    }
}
