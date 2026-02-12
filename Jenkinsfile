pipeline {
    agent any

    environment {
        // Git
        GIT_CREDS  = 'github-token-emailapp'
        GIT_REPO   = 'https://github.com/Janakiraman0207/Demo-Email-App.git'
        GIT_BRANCH = 'main'

        // SSH
        SSH_KEY     = 'deploy-ec2-key'
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '172.31.17.188'   // Slave private IP

        // Paths
        APP_DIR   = '/home/ubuntu/demo-email-app'
        NGINX_DIR = '/var/www/html'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: "${GIT_BRANCH}",
                    credentialsId: "${GIT_CREDS}",
                    url: "${GIT_REPO}"
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                if [ -d frontend ]; then
                    cd frontend
                    npm install
                    npm run build
                else
                    echo "Frontend not found, skipping build"
                fi
                '''
            }
        }

        stage('Deploy & Migrate') {
            steps {
                sshagent([env.SSH_KEY]) {
                    sh '''
                    set -e

                    mkdir -p ~/.ssh
                    ssh-keyscan -H ${DEPLOY_HOST} >> ~/.ssh/known_hosts

                    rsync -avz --delete \
                      --exclude='.git' \
                      --exclude='node_modules' \
                      ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${APP_DIR}

                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} <<EOF
                        set -e
                        cd ${APP_DIR}

                        python3 -m venv venv || true
                        source venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt || true
                        python manage.py migrate --noinput || true

                        if [ -d frontend/dist ]; then
                            sudo rm -rf ${NGINX_DIR}/*
                            sudo cp -r frontend/dist/* ${NGINX_DIR}/
                            sudo chown -R www-data:www-data ${NGINX_DIR}
                        fi
EOF
                    '''
                }
            }
        }

        stage('Restart Services') {
            steps {
                sshagent([env.SSH_KEY]) {
                    sh '''
                    ssh ${DEPLOY_USER}@${DEPLOY_HOST} "
                        sudo systemctl restart nginx || true
                        sudo systemctl restart fastapi || true
                    "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Deployment Failed'
        }
    }
}
