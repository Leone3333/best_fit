# BestFit 🏋️‍♂️💪
> Projeto prático desenvolvido para a A3 de Sistemas Distribuídos e Mobile.

O **BestFit** é um sistema de gerenciamento e acompanhamento de treinos para academia. A aplicação permite que usuários visualizem suas fichas de exercícios, registrem suas repetições/cargas em tempo real, atualizem dados de treino e acompanhem a conclusão de ciclos de fichas de forma dinâmica e integrada.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura baseada em JavaScript de ponta a ponta:

* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **Framework Web:** [Express.js](https://expressjs.com/)
* **Template Engine:** [EJS (Embedded JavaScript templates)](https://ejs.co/)
* **Banco de Dados:** [MySQL](https://www.mysql.com/) (Gerenciado via XAMPP)
* **ORM / Comunicação com o Banco:** [Sequelize](https://sequelize.org/)
* **Estilização e Interface:** HTML5, CSS3 e JavaScript Vanilla (AJAX/Fetch API)

---

## 📋 Pré-requisitos (O que você precisa baixar)

Antes de rodar a aplicação, certifique-se de ter instalado em sua máquina:

1.  **Node.js (Versão LTS):** Necessário para executar o servidor backend. [Baixar Node.js](https://nodejs.org/)
2.  **XAMPP:** Utilizado para rodar o servidor local do MySQL e gerenciar o banco de dados via phpMyAdmin. [Baixar XAMPP](https://www.apachefriends.org/)
3.  **Editor de Código:** Recomendado o [VS Code](https://code.visualstudio.com/).

---

## 🚀 Manual de Configuração e Instalação

### Passo 1: Configurar o Banco de Dados (XAMPP)
1. Abra o painel de controle do **XAMPP**.
2. Inicie os módulos **Apache** e **MySQL** clicando em *Start*.
3. Clique no botão *Admin* do módulo MySQL ou acesse no seu navegador: `http://localhost/phpmyadmin/`.
4. Crie um novo banco de dados com o nome do seu projeto (ex: `best_fit`).
5. Na pasta besFit artefatos possuem 2 arquivos `.sql` de dump, clique na aba **Importar**, selecione o arquivo besFitV! e clique em executar para criar o banco e em seguida execute o bestFitQuesryV1 para criar as tabelas views triggers e 3 usarios fundamentais.

### Passo 2: Configurar as Variáveis de Ambiente (.env)
Na raiz do projeto backend, crie ou edite o arquivo `.env` para apontar para as credenciais do seu XAMPP (por padrão, o MySQL do XAMPP não possui senha):

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=best_fit
DB_DIALECT=mysql
PORT=3000

--

## 💻 Comandos do Node.js para Rodar o Sistema 

Abra o terminal do seu sistema ouo terminal do vsCode dentro da pasta do projeto e execute os seguintes comandos:

1. npm insta: baixa as dependencias do projeto
2. npm run dev: Start o projeto 

Apos ver a a mensagem de sucesso o servidor ira apresentar o link para abrir a aplicação 