// Import the necessary libraries
// Updated for use with sqlite database
const { Sequelize } = require('sequelize');


// Use dotenv to load the path from .env file
require('dotenv').config();

// Set up the SQLite database connection using Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH  // Path to the SQLite file
});

module.exports = sequelize;