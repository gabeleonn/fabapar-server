//IMPORTS
const { Sequelize } = require('sequelize');

//DATABASE CONFIG
const { database } = require('../config');

//MODEL IMPORTS
const User = require('../User');
const Maintenance = require('../Equipment/Maintenance');
const Equipment = require('../Equipment');
const Ticket = require('../Ticket');

//CREATE CONNECTION
const connection = new Sequelize(database);

//INIT MODELS
User.Model.init(connection);
Maintenance.init(connection);
Equipment.Model.init(connection);
Ticket.Model.init(connection);

//INIT RELATIONS
Maintenance.associate(connection.models);
Equipment.Model.associate(connection.models);
User.Model.associate(connection.models);
Ticket.Model.associate(connection.models);

//EXPORTS
module.exports = connection;
