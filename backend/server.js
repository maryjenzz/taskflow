async function startServer() {
  try {
    console.log('Conectando ao banco...');

    await sequelize.authenticate();
    console.log('Banco conectado.');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados.');

    console.log('PORT recebida:', PORT);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}