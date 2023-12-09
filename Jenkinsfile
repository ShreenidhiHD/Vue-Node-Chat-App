pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18'
    }
    stages {
        stage('Prepare Environment') {
            steps {
                echo 'Cleaning workspace and clearing npm cache...'
                cleanWs() // Cleans the entire workspace
                sh 'npm cache clean --force' // Clears npm cache
            }
        }

        stage('Install Root Dependencies') {
            steps {
                echo 'Installing root level dependencies...'
                sh 'npm install'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                echo 'Installing client dependencies...'
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                echo 'Installing server dependencies...'
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Client') {
            steps {
                echo 'Starting client build...'
                dir('client') {
                    sh 'npm run build'
                }
                echo 'Client build completed.'
            }
        }

        stage('Run Server') {
            steps {
                echo 'Starting server...'
                dir('server') {
                    sh 'npm start' // Assuming 'npm start' runs your server
                }
                echo 'Server started.'
            }
        }

        stage('Run Server Tests') {
            steps {
                echo 'Running server tests...'
                dir('server') {
                    sh 'npm test'
                }
                echo 'Server tests completed.'
            }
        }
    }
    post {
        always {
            echo 'Build completed.'
        }
    }
}
