const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.get('/:at', Controller.findAll);
router.delete('/:id', Controller.delete);
router.patch('/:id', Controller.update);
router.post('/', Controller.create);

module.exports = router;
