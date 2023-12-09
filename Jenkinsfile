pipeline {
    agent any

    stages {
        stage('Check Branch') {
            steps {
                script {
                    // Check if the current branch is 'staging'
                    if (env.BRANCH_NAME != 'staging') {
                        error("This pipeline is only for the 'staging' branch.")
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies in client folder
                dir('client') {
                    sh 'npm install'
                }
                // Install dependencies in server folder
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Client') {
            steps {
                // Build client application
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Server') {
            steps {
                // Run the server
                dir('server') {
                    sh 'npm start' // Assuming 'npm start' runs your server
                }
            }
        }

        stage('Run Server Tests') {
            steps {
                // Run tests in the server
                dir('server') {
                    sh 'npm test'
                }
            }
        }
    }
}
