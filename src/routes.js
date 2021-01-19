const { Router } = require('express');

const router = new Router();

const User = require('./User');
const Equipment = require('./Equipment');
const auth = require('./middlewares/auth');
const Ticket = require('./Ticket');

router.post('/login', User.Controller.login);

router.use('/users', auth, User.routes);

router.use('/equipments', auth, Equipment.routes);

router.use('/tickets', auth, Ticket.routes);

module.exports = router;
