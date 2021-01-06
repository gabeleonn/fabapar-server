const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.post('/', Controller.create);

module.exports = router;
