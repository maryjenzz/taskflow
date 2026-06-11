# PRD - TaskFlow

## 1. Visão Geral do Produto

### Nome do Projeto

TaskFlow

### Descrição

TaskFlow é uma aplicação web para gerenciamento de tarefas pessoais, permitindo que usuários criem contas, realizem login e organizem suas atividades diárias de forma simples e intuitiva.

A plataforma oferece funcionalidades de cadastro, edição, exclusão e acompanhamento de tarefas, além de estatísticas visuais para auxiliar no controle da produtividade.

---

# 2. Objetivo do Produto

Desenvolver uma aplicação Full Stack utilizando React, Node.js, Express, Sequelize e MySQL, aplicando conceitos de:

* Frontend moderno com React
* Consumo de API REST
* Arquitetura MVC
* Persistência de dados com MySQL
* Autenticação de usuários
* Dashboard com estatísticas
* CRUD completo
* Responsividade

---

# 3. Público-Alvo

Usuários que desejam:

* Organizar tarefas pessoais
* Acompanhar produtividade
* Controlar atividades pendentes e concluídas
* Gerenciar compromissos com datas de vencimento

---

# 4. Tecnologias Obrigatórias

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Phosphor Icons
* Chart.js
* React ChartJS 2

## Backend

* Node.js
* Express

## Banco de Dados

* MySQL

## ORM

* Sequelize

## Arquitetura

MVC (Model, View e Controller)

Estrutura sugerida:

```text
backend/
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
└── server.js
```

---

# 5. Identidade Visual

## Paleta de Cores

```css
:root {
  --vintage-grape: #4a4063;
  --thistle: #bfacc8;
  --pale-slate: #c8c6d7;
  --velvet-orchid: #783f8e;
  --indigo: #4f1271;
}
```

## Aplicação das Cores

| Elemento           | Cor     |
| ------------------ | ------- |
| Fundo Principal    | #c8c6d7 |
| Navbar             | #4a4063 |
| Botões Primários   | #783f8e |
| Botões Secundários | #4f1271 |
| Cards              | #ffffff |
| Destaques          | #bfacc8 |

---

# 6. Requisitos Funcionais

## RF001 - Cadastro de Usuário

O sistema deve permitir que novos usuários criem uma conta.

### Campos

* Nome
* Email
* Senha
* Confirmar senha

### Regras

* Email único
* Senha mínima de 6 caracteres
* Senhas devem coincidir

---

## RF002 - Login

O usuário deve conseguir acessar sua conta.

### Campos

* Email
* Senha

### Regras

* Validar credenciais
* Utilizar JWT para autenticação

---

## RF003 - Logout

O usuário deve conseguir encerrar sua sessão.

---

## RF004 - Listar Tarefas

O usuário deve visualizar apenas suas próprias tarefas.

Informações exibidas:

* Título
* Descrição
* Status
* Data de vencimento
* Data de criação

---

## RF005 - Criar Tarefa

O usuário deve conseguir cadastrar uma nova tarefa.

### Campos

* Título
* Descrição
* Data de vencimento

### Regras

* Título obrigatório
* Descrição opcional

---

## RF006 - Editar Tarefa

O usuário deve conseguir alterar qualquer informação da tarefa.

---

## RF007 - Excluir Tarefa

O usuário deve conseguir remover tarefas.

### Regra

Solicitar confirmação antes da exclusão.

---

## RF008 - Marcar Como Concluída

O usuário deve conseguir alternar o status da tarefa.

Status possíveis:

* Pendente
* Concluída

---

## RF009 - Filtrar Tarefas

Filtros disponíveis:

### Por Status

* Todas
* Pendentes
* Concluídas

### Por Data de Vencimento

Exibir tarefas ordenadas pela data.

---

## RF010 - Pesquisa de Tarefas

Campo de busca para pesquisar tarefas por:

* Título
* Descrição

Busca em tempo real.

---

## RF011 - Estatísticas

O sistema deve exibir métricas do usuário.

### Indicadores

* Total de tarefas
* Tarefas pendentes
* Tarefas concluídas

---

## RF012 - Dashboard Gráfico

Utilizar Chart.js para exibir:

### Gráfico de Pizza

Distribuição:

* Pendentes
* Concluídas

---

# 7. Requisitos Não Funcionais

## RNF001

Sistema responsivo para:

* Desktop
* Tablet
* Smartphone

---

## RNF002

Tempo de resposta inferior a 2 segundos.

---

## RNF003

Interface intuitiva e moderna.

---

## RNF004

Dados protegidos por autenticação JWT.

---

## RNF005

Senhas armazenadas utilizando hash bcrypt.

---

# 8. Fluxo do Usuário

## Primeiro Acesso

Cadastro → Login → Dashboard

---

## Usuário Autenticado

Dashboard → Criar Tarefa

Dashboard → Editar Tarefa

Dashboard → Excluir Tarefa

Dashboard → Filtrar Tarefas

Dashboard → Visualizar Estatísticas

Logout

---

# 9. Estrutura do Banco de Dados

## Tabela: users

```sql
id
name
email
password
created_at
updated_at
```

### Modelo Sequelize

```javascript
User {
  id
  name
  email
  password
}
```

---

## Tabela: tasks

```sql
id
title
description
status
due_date
user_id
created_at
updated_at
```

### Modelo Sequelize

```javascript
Task {
  id
  title
  description
  status
  due_date
  user_id
}
```

---

# 10. Relacionamentos

Um usuário possui várias tarefas.

```text
User 1 ---- N Task
```

### Sequelize

```javascript
User.hasMany(Task);

Task.belongsTo(User);
```

---

# 11. Endpoints da API

## Auth

### POST

```http
/api/auth/register
```

Cadastrar usuário.

---

### POST

```http
/api/auth/login
```

Realizar login.

---

## Tasks

### GET

```http
/api/tasks
```

Listar tarefas do usuário.

---

### GET

```http
/api/tasks/:id
```

Buscar tarefa específica.

---

### POST

```http
/api/tasks
```

Criar tarefa.

---

### PUT

```http
/api/tasks/:id
```

Editar tarefa.

---

### DELETE

```http
/api/tasks/:id
```

Excluir tarefa.

---

### PATCH

```http
/api/tasks/:id/status
```

Alterar status.

---

### GET

```http
/api/tasks/stats
```

Retornar estatísticas.

---

# 12. Telas Necessárias

## Tela de Login

Campos:

* Email
* Senha

Botões:

* Entrar
* Criar Conta

---

## Tela de Cadastro

Campos:

* Nome
* Email
* Senha
* Confirmar Senha

---

## Dashboard

Componentes:

* Navbar
* Cards de estatísticas
* Campo de pesquisa
* Filtro de status
* Lista de tarefas
* Gráfico Chart.js
* Botão Nova Tarefa

---

## Modal de Tarefa

Utilizado para:

* Criar
* Editar

Campos:

* Título
* Descrição
* Data de vencimento

---

# 13. Componentes React

```text
components/
│
├── Navbar
├── TaskCard
├── TaskList
├── TaskForm
├── SearchBar
├── StatusFilter
├── StatsCards
├── TaskChart
├── ProtectedRoute
└── Modal
```

---

# 14. Critérios de Aceitação

✔ Usuário consegue criar conta

✔ Usuário consegue fazer login

✔ JWT funciona corretamente

✔ Usuário visualiza apenas suas tarefas

✔ CRUD de tarefas funcionando

✔ Filtro por status funcionando

✔ Busca funcionando

✔ Marcação de concluída funcionando

✔ Estatísticas atualizadas em tempo real

✔ Gráfico Chart.js exibido corretamente

✔ Layout responsivo

✔ Banco MySQL integrado via Sequelize

✔ Arquitetura MVC implementada

---

# 15. Possíveis Melhorias Futuras

* Tema Dark Mode
* Prioridade das tarefas
* Upload de anexos
* Notificações
* Compartilhamento de tarefas
* Recuperação de senha
* Perfil do usuário
* Categorias de tarefas
* Arrastar e soltar tarefas (Drag and Drop)

---

# Resultado Esperado

Uma aplicação Full Stack completa de gerenciamento de tarefas, desenvolvida com React + Node.js + Express + Sequelize + MySQL, utilizando arquitetura MVC, autenticação JWT, CRUD completo de tarefas, dashboard estatístico e interface moderna baseada na paleta definida.
