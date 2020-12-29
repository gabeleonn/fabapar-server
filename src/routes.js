const { Router } = require('express');

const router = new Router();

const User = require('./User');

router.use('/users', User.routes);

module.exports = router;
