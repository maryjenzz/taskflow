# SPEC.md - TaskFlow

# 1. Objetivo

Este documento define a especificação técnica para implementação da aplicação TaskFlow.

O objetivo é fornecer instruções claras para um agente de IA desenvolver toda a aplicação Full Stack utilizando React, Node.js, Express, Sequelize e MySQL.

---

# 2. Arquitetura Geral

A aplicação deverá seguir arquitetura cliente-servidor.

```text
Frontend (React)
        │
        │ HTTP / JSON
        ▼
Backend API REST (Express)
        │
        ▼
MySQL Database
```

A comunicação deverá ocorrer exclusivamente através de API REST.

---

# 3. Arquitetura Backend

Implementar padrão MVC.

```text
backend/
│
├── src/
│
├── config/
│   └── database.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── controllers/
│   ├── AuthController.js
│   └── TaskController.js
│
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── services/
│   ├── authService.js
│   └── taskService.js
│
├── database/
│   └── migrations/
│
├── app.js
└── server.js
```

---

# 4. Arquitetura Frontend

```text
frontend/
│
├── src/
│
├── assets/
│
├── components/
│   ├── Navbar/
│   ├── TaskCard/
│   ├── TaskList/
│   ├── TaskForm/
│   ├── SearchBar/
│   ├── StatusFilter/
│   ├── StatsCards/
│   ├── TaskChart/
│   ├── Modal/
│   └── ProtectedRoute/
│
├── pages/
│   ├── Login/
│   ├── Register/
│   └── Dashboard/
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── taskService.js
│
├── contexts/
│   └── AuthContext.jsx
│
├── hooks/
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# 5. Banco de Dados

## Tabela Users

| Campo      | Tipo                |
| ---------- | ------------------- |
| id         | INT PK              |
| name       | VARCHAR(100)        |
| email      | VARCHAR(150) UNIQUE |
| password   | VARCHAR(255)        |
| created_at | DATETIME            |
| updated_at | DATETIME            |

---

## Tabela Tasks

| Campo       | Tipo         |
| ----------- | ------------ |
| id          | INT PK       |
| title       | VARCHAR(255) |
| description | TEXT         |
| status      | ENUM         |
| due_date    | DATE         |
| user_id     | INT FK       |
| created_at  | DATETIME     |
| updated_at  | DATETIME     |

---

# 6. Modelos Sequelize

## User

```javascript
id
name
email
password
```

Validações:

* email obrigatório
* email único
* senha obrigatória

---

## Task

```javascript
id
title
description
status
due_date
user_id
```

Validações:

* título obrigatório
* status obrigatório
* user_id obrigatório

---

# 7. Relacionamentos

```javascript
User.hasMany(Task);

Task.belongsTo(User);
```

Uma tarefa pertence a apenas um usuário.

Um usuário possui várias tarefas.

---

# 8. Autenticação

Utilizar JWT.

Bibliotecas:

```bash
jsonwebtoken
bcryptjs
```

Fluxo:

1. Usuário realiza login.
2. Backend valida credenciais.
3. Backend gera JWT.
4. Token retorna ao frontend.
5. Frontend salva token no localStorage.
6. Todas as requisições protegidas enviam Authorization Bearer Token.

Exemplo:

```http
Authorization: Bearer eyJhbG...
```

---

# 9. Middleware de Autenticação

Criar middleware:

```javascript
authMiddleware
```

Responsabilidades:

* verificar existência do token
* validar token
* extrair id do usuário
* disponibilizar req.userId

Rotas protegidas:

```text
/api/tasks/*
```

---

# 10. API Endpoints

## Auth

### POST /api/auth/register

Request:

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Usuário criado com sucesso"
}
```

---

### POST /api/auth/login

Request:

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt",
  "user": {
    "id": 1,
    "name": "Maria"
  }
}
```

---

## Tasks

### GET /api/tasks

Retorna tarefas do usuário autenticado.

Filtros opcionais:

```text
?status=pending
?status=completed
?search=mercado
```

---

### GET /api/tasks/:id

Retorna uma tarefa específica.

Validar propriedade da tarefa.

---

### POST /api/tasks

Request:

```json
{
  "title": "Comprar pão",
  "description": "Padaria central",
  "due_date": "2026-06-20"
}
```

Status inicial:

```text
pending
```

---

### PUT /api/tasks/:id

Atualiza:

* título
* descrição
* data
* status

---

### DELETE /api/tasks/:id

Remove tarefa.

---

### PATCH /api/tasks/:id/status

Alterna:

```text
pending
completed
```

---

### GET /api/tasks/stats

Response:

```json
{
  "total": 20,
  "pending": 5,
  "completed": 15
}
```

---

# 11. Regras de Negócio

## RN001

Usuário só pode visualizar próprias tarefas.

---

## RN002

Usuário só pode editar próprias tarefas.

---

## RN003

Usuário só pode excluir próprias tarefas.

---

## RN004

Título é obrigatório.

---

## RN005

Email deve ser único.

---

## RN006

Senha mínima de 6 caracteres.

---

## RN007

Status permitido:

```text
pending
completed
```

---

# 12. Gerenciamento de Estado

Utilizar:

```text
Context API
```

Criar:

```text
AuthContext
```

Responsável por:

* usuário autenticado
* token
* login
* logout
* persistência da sessão

---

# 13. Dashboard

Componentes obrigatórios:

## Estatísticas

Cards:

* Total
* Pendentes
* Concluídas

---

## Gráfico

Biblioteca:

```text
Chart.js
```

Tipo:

```text
Pie Chart
```

Dados:

* Pendentes
* Concluídas

---

## Lista de Tarefas

Exibir:

* título
* descrição
* vencimento
* status

Ações:

* editar
* excluir
* concluir

---

# 14. Busca

Implementar busca em tempo real.

Campos pesquisados:

* title
* description

A busca pode ser feita:

Frontend + Backend.

Enviar:

```text
?search=texto
```

---

# 15. Filtros

Filtro por status:

```text
Todas
Pendentes
Concluídas
```

Enviar:

```text
?status=pending
```

ou

```text
?status=completed
```

---

# 16. Interface

Utilizar Tailwind CSS.

Design:

* moderno
* minimalista
* responsivo

Paleta:

```css
--vintage-grape: #4a4063;
--thistle: #bfacc8;
--pale-slate: #c8c6d7;
--velvet-orchid: #783f8e;
--indigo: #4f1271;
```

---

# 17. Ícones

Utilizar exclusivamente:

```text
@phosphor-icons/react
```

Sugestões:

* Plus
* Pencil
* Trash
* CheckCircle
* SignOut
* MagnifyingGlass

---

# 18. Tratamento de Erros

Backend deve retornar:

```json
{
  "message": "Descrição do erro"
}
```

Status:

```text
400
401
403
404
500
```

Frontend deve exibir feedback visual para:

* sucesso
* erro
* carregamento

---

# 19. Responsividade

Breakpoints:

```text
Mobile
Tablet
Desktop
```

Dashboard deve reorganizar:

* cards
* gráfico
* lista

sem quebra visual.

---

# 20. Critérios de Conclusão

A aplicação será considerada pronta quando:

✓ Cadastro funcionar

✓ Login funcionar

✓ JWT funcionar

✓ CRUD de tarefas completo

✓ Filtros funcionando

✓ Busca funcionando

✓ Estatísticas funcionando

✓ Gráfico funcionando

✓ Responsividade implementada

✓ Banco MySQL integrado

✓ Sequelize configurado

✓ Arquitetura MVC implementada

✓ Código organizado e documentado
