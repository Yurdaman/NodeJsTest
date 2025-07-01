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
                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }

        stage('Run End-to-End Tests') {
            steps {
                // Запуск сервера в фоне
                sh 'npm start &'
                // Ждём, пока сервер запустится
                sh 'sleep 5'
                // Запуск E2E тестов
                sh 'npm run test:e2e'
            }
        }

        stage('Check for Broken Links') {
            steps {
                sh 'npm run check-links'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying to production...'
        //         // Здесь можно добавить шаги деплоя
        //     }
        // }
    }
}