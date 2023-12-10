// pipeline {
//     agent any
//     tools {
//         nodejs 'NodeJS 18'
//     }
//     stages {
//         stage('Install Root Dependencies') {
//             steps {
//                 echo 'Installing root level dependencies...'
//                 sh 'pwd' // Print the current working directory
//                 sh 'npm install'
//             }   
//         }   


//         stage('Install Client Dependencies') {
//             steps {
//                 echo 'Installing client dependencies...'
//                 dir('client') {
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Install Server Dependencies') {
//             steps {
//                 echo 'Installing server dependencies...'
//                 dir('server') {
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Build Client') {
//             steps {
//                 echo 'Starting client build...'
//                 dir('client') {
//                     sh 'npm run build'
//                 }
//                 echo 'Client build completed.'
//             }
//         }

//         stage('Run Server') {
//             steps {
//                 echo 'Starting server...'
//                 dir('server') {
//                     sh 'npm start' 
//                 }
//                 echo 'Server started.'
//             }
//         }

//         stage('Run Server Tests') {
//             steps {
//                 echo 'Running server tests...'
//                 dir('server') {
//                     sh 'npm test'
//                 }
//                 echo 'Server tests completed.'
//             }
//         }
//     }
//     post {
//         always {
//             echo 'Build completed.'
//         }
//     }
// }
// pipeline {
//     agent any
//     environment {
//         DOCKER_IMAGE = 'krishnam1de/chat' // Your Docker Hub repo
//         IMAGE_TAG = 'latest' // Or a dynamic tag, like a build number or Git commit hash
//         STABLE_TAG = 'stable' // A tag for your stable version
//         EC2_HOST = '13.237.67.94' // Replace with your EC2 instance's IP
//     }
//     tools {
//         nodejs 'NodeJS 18'
//     }
//     stages {
//         stage('Pre-Build Check') {
//            steps {
//                 echo 'Checking EC2 instance connectivity...'
//                 sh "ssh -o BatchMode=yes -o ConnectTimeout=5 ec2-root@${EC2_HOST} 'echo connected' || exit 1"
//             }

//         }
//         stage('Build Docker Image') {
//             steps {
//                 echo 'Building Docker image...'
//                 sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
//             }
//         }

//         stage('Push to Docker Hub') {
//             steps {
//                 echo 'Pushing image to Docker Hub...'
//                 withCredentials([usernamePassword(credentialsId: 'adf8fed3-5043-4889-becb-89727fd94932', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
//                     sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
//                     sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 echo 'Deploying application to AWS EC2...'
//                 withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '1f28137a-3783-4610-9314-509073e03a58', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                     sh "ssh -o StrictHostKeyChecking=no ec2-root@${EC2_HOST} 'docker pull ${DOCKER_IMAGE}:${IMAGE_TAG} && docker run -d -p 80:80 ${DOCKER_IMAGE}:${IMAGE_TAG}'"
//                 }
//             }
//         }
//     }
//     post {
//         always {
//             echo 'Build and Deployment completed.'
//         }
//         failure {
//             echo 'Deployment failed. Performing rollback...'
//             withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '1f28137a-3783-4610-9314-509073e03a58', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                 sh "ssh -o StrictHostKeyChecking=no ec2-root@${EC2_HOST} 'docker pull ${DOCKER_IMAGE}:${STABLE_TAG} && docker run -d -p 80:80 ${DOCKER_IMAGE}:${STABLE_TAG}'"
//             }
//         }
//     }
// }
pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'krishnam1de/chat' // Your Docker Hub repo
        IMAGE_TAG = 'latest' // Or a dynamic tag, like a build number or Git commit hash
        STABLE_TAG = 'stable' // A tag for your stable version
        EC2_HOST = '13.237.67.94' // Replace with your EC2 instance's IP
        AWS_CREDENTIALS = credentials('1f28137a-3783-4610-9314-509073e03a58')
        DOCKERHUB_CREDENTIALS = credentials('adf8fed3-5043-4889-becb-89727fd94932')
        SSH_CREDENTIALS = credentials('93e4fec0-85d1-4e1c-a8bf-71762e7c9656')
    }
    tools {
        nodejs 'NodeJS 18'
    }
    stages {
        stage('Pre-Build Check') {
    steps {
        echo 'Checking EC2 instance connectivity...'
        withCredentials([sshUserPrivateKey(credentialsId: '93e4fec0-85d1-4e1c-a8bf-71762e7c9656', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
            sh "ssh -o BatchMode=yes -o ConnectTimeout=5 -i ${SSH_PRIVATE_KEY} ec2-user@${EC2_HOST} 'echo connected' || exit 1"
        }
    }
}

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'adf8fed3-5043-4889-becb-89727fd94932', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to AWS EC2...'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '1f28137a-3783-4610-9314-509073e03a58', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "ssh -o StrictHostKeyChecking=no -i ${SSH_CREDENTIALS} ec2-user@${EC2_HOST} 'docker pull ${DOCKER_IMAGE}:${IMAGE_TAG} && docker run -d -p 80:80 ${DOCKER_IMAGE}:${IMAGE_TAG}'"
                }
            }
        }
    }
    post {
        always {
            echo 'Build and Deployment completed.'
        }
        failure {
            echo 'Deployment failed. Performing rollback...'
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '1f28137a-3783-4610-9314-509073e03a58', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                sh "ssh -o StrictHostKeyChecking=no -i ${SSH_CREDENTIALS} ec2-user@${EC2_HOST} 'docker pull ${DOCKER_IMAGE}:${STABLE_TAG} && docker run -d -p 80:80 ${DOCKER_IMAGE}:${STABLE_TAG}'"
            }
        }
    }
}
