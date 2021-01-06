const { Router } = require('express');

const router = new Router();

const User = require('./User');

const Department = require('./Department');

router.use('/users', User.routes);
router.use('/departments', Department.routes);

module.exports = router;
