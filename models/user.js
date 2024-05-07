const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Ensure the connection path is correct

class User extends Model {}

User.init({
  // Assuming your user has these fields, adjust as necessary
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add additional fields as per your project requirements
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;