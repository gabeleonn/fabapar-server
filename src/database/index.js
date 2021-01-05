//IMPORTS
const { Sequelize } = require('sequelize');

//DATABASE CONFIG
const { database } = require('../config');

//MODEL IMPORTS
const Department = require('../Department');
const User = require('../User');

//CREATE CONNECTION
const connection = new Sequelize(database);

//INIT MODELS
Department.Model.init(connection);
User.Model.init(connection);

//INIT RELATIONS
User.Model.associate(connection.models);

//EXPORTS
module.exports = connection;
