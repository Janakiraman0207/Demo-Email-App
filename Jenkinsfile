pipeline {
    agent none

    environment {
        // Git
        GIT_REPO = 'https://github.com/thestackly/stackly-email.git'
        BRANCH   = 'main'

        // Deployment target
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '172.31.41.124'
        DEPLOY_SSH  = 'deploy-ec2-key'   // Jenkins SSH credential ID

        // Paths on deploy EC2
        REMOTE_BASE = '/home/ubuntu/stackly-email'
        FRONTEND_DIR = "${REMOTE_BASE}/frontend"
        FASTAPI_DIR  = "${REMOTE_BASE}/fastapi_app"

        // Frontend build
        FRONTEND_BUILD   = 'dist'
        FRONTEND_RELEASE = "/tmp/frontend_${BUILD_NUMBER}"

        // Emails
        EMAIL_RECIPIENTS = 'yarramallamaheshbabu@thestackly.com,uday@thestackly.com,janakiraman@thestackly.com,saranya@thestackly.com,sevitha@thestackly.com'
    }

    stages {

        stage('Checkout') {
            agent { label 'Website' }
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            agent { label 'Website' }
            environment {
                VITE_API_BASE_URL = 'http://34.208.181.79:8000'
            }
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            agent { label 'Website' }
            steps {
                sshagent(credentials: ["${DEPLOY_SSH}"]) {
                    sh '''
                        set -e

                        echo "▶ Preparing workspace SSH known_hosts"
                        mkdir -p .ssh
                        ssh-keyscan -t ed25519 172.31.41.124 > .ssh/known_hosts
                        chmod 600 .ssh/known_hosts

                        SSH_OPTS="-o StrictHostKeyChecking=yes -o UserKnownHostsFile=$(pwd)/.ssh/known_hosts"

                        echo "▶ Rsync backend code"
                        rsync -az --delete \
                          --exclude node_modules \
                          --exclude .venv \
                          -e "ssh $SSH_OPTS" \
                          ./ ubuntu@172.31.41.124:/home/ubuntu/stackly-email/

                        echo "▶ Running backend setup on server"
                        ssh $SSH_OPTS ubuntu@172.31.41.124 <<EOF
                          set -e
                          cd /home/ubuntu/stackly-email

                          python3 -m venv .venv || true
                          source .venv/bin/activate
                          pip install --upgrade pip
                          pip install -r requirements.txt
                          python manage.py migrate
EOF
                    '''
                }
            }
        }

        stage('Deploy Frontend (Atomic)') {
            agent { label 'Website' }
            steps {
                sshagent(credentials: ["${DEPLOY_SSH}"]) {
                    sh '''
                        set -e

                        mkdir -p .ssh
                        ssh-keyscan -t ed25519 172.31.41.124 > .ssh/known_hosts
                        chmod 600 .ssh/known_hosts

                        SSH_OPTS="-o StrictHostKeyChecking=yes -o UserKnownHostsFile=$(pwd)/.ssh/known_hosts"

                        ssh $SSH_OPTS ubuntu@172.31.41.124 <<EOF
                          set -e

                          sudo rm -rf /tmp/frontend_${BUILD_NUMBER}
                          sudo mkdir -p /tmp/frontend_${BUILD_NUMBER}
                          sudo cp -r /home/ubuntu/stackly-email/frontend/dist/* /tmp/frontend_${BUILD_NUMBER}/

                          sudo rm -rf /var/www/html/*
                          sudo cp -r /tmp/frontend_${BUILD_NUMBER}/* /var/www/html/
                          sudo chown -R www-data:www-data /var/www/html

                          sudo systemctl reload nginx
EOF
                    '''
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ EmailApp Deployment SUCCESS",
                to: "${EMAIL_RECIPIENTS}",
                body: "Deployment succeeded at ${new Date()}"
            )
        }

        failure {
            emailext(
                subject: "❌ EmailApp Deployment FAILED",
                to: "${EMAIL_RECIPIENTS}",
                body: "Deployment failed. Please check Jenkins logs."
            )
        }
    }
}
