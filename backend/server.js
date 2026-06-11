const app = require('./src/app');
const sequelize = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Conectando ao banco...');
    console.log('HOST=', JSON.stringify(process.env.DB_HOST));
    console.log('PORT=', JSON.stringify(process.env.DB_PORT));
    console.log('NAME=', JSON.stringify(process.env.DB_NAME));
    console.log('USER=', JSON.stringify(process.env.DB_USER));
    console.log('PASS=', JSON.stringify(process.env.DB_PASS));

    await sequelize.authenticate();

    console.log('Banco conectado.');

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
