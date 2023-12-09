pipeline {
    agent any
   
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Starting to install dependencies...'
                
                // Install dependencies in client folder
                dir('client') {
                    echo 'Installing client dependencies...'
                    sh 'npm install'
                }
                
                // Install dependencies in server folder
                dir('server') {
                    echo 'Installing server dependencies...'
                    sh 'npm install'
                }
                
                echo 'Dependencies installed.'
            }
        }

        stage('Build Client') {
            steps {
                echo 'Starting client build...'
                // Build client application
                dir('client') {
                    sh 'npm run build'
                }
                echo 'Client build completed.'
            }
        }

        stage('Run Server') {
            steps {
                echo 'Starting server...'
                // Run the server
                dir('server') {
                    sh 'npm start' // Assuming 'npm start' runs your server
                }
                echo 'Server started.'
            }
        }

        stage('Run Server Tests') {
            steps {
                echo 'Running server tests...'
                // Run tests in the server
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
