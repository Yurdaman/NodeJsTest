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
                // Запуск сервера в фоне и ожидание (Windows PowerShell)
                bat 'start /b npm start'
                bat 'timeout /t 5 /nobreak'
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
