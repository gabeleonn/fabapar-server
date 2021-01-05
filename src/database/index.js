//IMPORTS
const { Sequelize } = require('sequelize');

//DATABASE CONFIG
const { database } = require('../config');

//MODEL IMPORTS

//CREATE CONNECTION
const connection = new Sequelize(database);

//INIT MODELS
//User.Model.init(connection);

//INIT RELATIONS
//User.Model.associate(connection.models);

//EXPORTS
module.exports = connection;
