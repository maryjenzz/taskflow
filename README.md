# 🚀 TaskFlow

TaskFlow é uma aplicação Full Stack de gerenciamento de tarefas pessoais desenvolvida com React, Node.js, Express, Sequelize e MySQL.

A plataforma permite que usuários criem contas, façam login e organizem suas atividades diárias através de uma interface moderna, responsiva e intuitiva.

---

## 📋 Funcionalidades

### 👤 Usuários

* Cadastro de usuário
* Login com autenticação JWT
* Logout
* Persistência de sessão

### ✅ Tarefas

* Criar tarefas
* Editar tarefas
* Excluir tarefas
* Marcar tarefas como concluídas
* Visualizar tarefas cadastradas
* Filtrar por status
* Pesquisar tarefas
* Ordenar por data de vencimento

### 📊 Dashboard

* Total de tarefas
* Tarefas pendentes
* Tarefas concluídas
* Gráfico de estatísticas com Chart.js

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Phosphor Icons
* Chart.js
* React ChartJS 2

### Backend

* Node.js
* Express

### Banco de Dados

* MySQL

### ORM

* Sequelize

### Segurança

* JWT (JSON Web Token)
* BcryptJS

---

## 🎨 Paleta de Cores

| Nome          | Cor     |
| ------------- | ------- |
| Vintage Grape | #4A4063 |
| Thistle       | #BFACC8 |
| Pale Slate    | #C8C6D7 |
| Velvet Orchid | #783F8E |
| Indigo        | #4F1271 |

---

## 📂 Estrutura do Projeto

```text
taskflow/
│
├── frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── contexts/
│   ├── routes/
│   └── utils/
│
├── backend/
│
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── database/
│
└── README.md
```

---

## 🗄️ Banco de Dados

### Users

| Campo    | Tipo    |
| -------- | ------- |
| id       | INT     |
| name     | VARCHAR |
| email    | VARCHAR |
| password | VARCHAR |

### Tasks

| Campo       | Tipo    |
| ----------- | ------- |
| id          | INT     |
| title       | VARCHAR |
| description | TEXT    |
| status      | ENUM    |
| due_date    | DATE    |
| user_id     | INT     |

---

## 🔗 Relacionamentos

```text
User 1 ---- N Task
```

Um usuário pode possuir várias tarefas.

Cada tarefa pertence a apenas um usuário.

---

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/taskflow.git
```

---

### 2. Entrar na pasta

```bash
cd taskflow
```

---

## 🚀 Configuração do Backend

### Entrar na pasta backend

```bash
cd backend
```

### Instalar dependências

```bash
npm install
```

### Criar arquivo .env

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=taskflow
DB_USER=root
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_secreta
```

### Executar migrations

```bash
npx sequelize-cli db:migrate
```

### Iniciar servidor

```bash
npm run dev
```

---

## 💻 Configuração do Frontend

### Entrar na pasta frontend

```bash
cd frontend
```

### Instalar dependências

```bash
npm install
```

### Executar aplicação

```bash
npm run dev
```

---

## 🔐 Autenticação

A aplicação utiliza JWT para autenticação.

Após o login:

1. O backend gera um token.
2. O frontend armazena o token.
3. As rotas protegidas utilizam o token nas requisições.

Exemplo:

```http
Authorization: Bearer TOKEN
```

---

## 📡 Endpoints

### Auth

| Método | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Tasks

| Método | Endpoint              |
| ------ | --------------------- |
| GET    | /api/tasks            |
| GET    | /api/tasks/:id        |
| POST   | /api/tasks            |
| PUT    | /api/tasks/:id        |
| DELETE | /api/tasks/:id        |
| PATCH  | /api/tasks/:id/status |
| GET    | /api/tasks/stats      |

---

## 📱 Responsividade

A aplicação foi projetada para funcionar em:

* 📱 Smartphones
* 📱 Tablets
* 💻 Desktops

---

## 📈 Funcionalidades Futuras

* Dark Mode
* Categorias de tarefas
* Prioridades
* Recuperação de senha
* Notificações
* Upload de anexos
* Drag and Drop
* Compartilhamento de tarefas

---

## 📸 Screenshots

### Login

```text
<img width="592" height="676" alt="image" src="https://github.com/user-attachments/assets/5a888203-314c-4073-bb76-eb795e0e6e85" />
```

### Dashboard

```text
<img width="1920" height="835" alt="image" src="https://github.com/user-attachments/assets/5d874beb-1374-4ada-81df-2264fd6c535e" />

```

### Estatísticas

```text
<img width="492" height="410" alt="image" src="https://github.com/user-attachments/assets/14bdd97c-2c0b-43cc-9ed1-6c79d928e9ea" />

```

---

## 👩‍💻 Desenvolvido por

**Mylena Jenzura**

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web utilizando React, Node.js, Express, Sequelize e MySQL.

---

## 📄 Licença

Este projeto está sob a licença MIT.

Sinta-se livre para utilizar, modificar e estudar o código.
