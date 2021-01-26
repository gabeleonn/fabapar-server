const server = require('./server');
const database = require('./database');
const auth = require('./auth');
const nodemailer = require('./nodemailer');

module.exports = { server, database, auth, nodemailer };
