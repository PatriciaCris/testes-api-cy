pipeline {
    agent any

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/PatriciaCris/testes-api-cy.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}