const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.post('/', Controller.create);
router.get('/', Controller.findAll);
router.get('/:code', Controller.findOne);
router.patch('/:code', Controller.update);
router.delete('/:code', Controller.delete);

module.exports = router;
