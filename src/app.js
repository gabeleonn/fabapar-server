const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const database = require('./bin/mongo');

const app = express();

app.use(express.json());
app.use(cors());

database.connect();

app.use('', routes);

module.exports = app;
