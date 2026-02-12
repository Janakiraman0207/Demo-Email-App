pipeline {
    agent any

    environment {
        // Git
        GIT_REPO = 'https://github.com/Janakiraman0207/Demo-Email-App.git'
        BRANCH   = 'main'

        // Deployment target
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '172.31.17.188'   // <-- Put your SLAVE PRIVATE IP here
        DEPLOY_SSH  = 'deploy-ec2-key'

        // Remote path
        REMOTE_BASE = '/home/ubuntu/demo-email-app'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: "${BRANCH}",
                    credentialsId: 'github-token-emailapp',
                    url: "${GIT_REPO}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ["${DEPLOY_SSH}"]) {
                    sh '''
                        set -e

                        echo "Adding host to known_hosts"
                        mkdir -p ~/.ssh
                        ssh-keyscan -H ${DEPLOY_HOST} >> ~/.ssh/known_hosts

                        echo "Syncing files to server"
                        rsync -avz --delete \
                          --exclude='.git' \
                          --exclude='node_modules' \
                          ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${REMOTE_BASE}

                        echo "Running backend setup"
                        ssh ${DEPLOY_USER}@${DEPLOY_HOST} <<EOF
                          set -e
                          cd ${REMOTE_BASE}

                          python3 -m venv venv || true
                          source venv/bin/activate
                          pip install --upgrade pip
                          pip install -r requirements.txt || true

                          sudo systemctl restart nginx || true
                          sudo systemctl restart fastapi || true
EOF
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful"
        }
        failure {
            echo "Deployment Failed"
        }
    }
}
