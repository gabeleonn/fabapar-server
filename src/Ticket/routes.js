const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.post('/', Controller.create);
router.get('/:code', Controller.find);
router.get('/', Controller.findAll);
router.delete('/', Controller.delete);
router.patch('/:id', Controller.update);

module.exports = router;
