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

        stage('Install Playwright browsers') {
            steps {
                bat 'npx playwright install'
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
                bat 'start /b npm start'
                bat 'ping 127.0.0.1 -n 6 > nul'
                bat 'npm run test:e2e'
            }
        }

        stage('Check for Broken Links') {
            steps {
                bat 'npm run check-links'
            }
        }
    }
}
