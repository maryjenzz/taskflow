const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? 'definido' : 'undefined');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'taskflow',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // set to console.log to see SQL queries
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

module.exports = sequelize;
