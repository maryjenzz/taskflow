const app = require('./src/app');
const sequelize = require('./src/config/database');
const mysql = require('mysql2/promise');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  });

  const dbName = process.env.DB_NAME || 'taskflow';
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();
}

async function startServer() {
  try {
    // 1. Auto-create database if not exists
    console.log('Verificando/Criando banco de dados...');
    await createDatabaseIfNotExists();

    // 2. Sync Sequelize models
    console.log('Sincronizando modelos com o banco de dados...');
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados com sucesso.');

    // 3. Start server
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
