const { Router } = require('express');

const router = new Router();

const User = require('./User');
const Department = require('./Department');
const Equipment = require('./Equipment');

router.use('/users', User.routes);
router.use('/departments', Department.routes);
router.use('/equipments', Equipment.routes);

module.exports = router;
