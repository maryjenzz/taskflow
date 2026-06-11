const app = require('./src/app');
const sequelize = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Conectando ao banco...');

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
