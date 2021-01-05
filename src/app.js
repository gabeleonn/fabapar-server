//IMPORTS
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//DB INIT
require('./database');

//EXPRESS INIT
const app = express();

//CONFIGURATION
app.use(express.json());
app.use(cors());

//MIDDLEWARES

//ROUTES
app.use('/v1', routes);

//EXPORTS
module.exports = app;
