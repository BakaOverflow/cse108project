// config/connection.js
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH  // Ensure your .env points to 'checkers.db'
});

module.exports = sequelize;
