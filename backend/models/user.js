// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust this path if necessary

class User extends Model {}

User.init({
  // Make sure these field names match those in your database schema
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false // Add this only if you do not want Sequelize to handle createdAt and updatedAt
});

module.exports = User;


// Old code if needed
/*
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'users'  // Explicitly define table name to match your SQL schema
});

module.exports = User;
*/