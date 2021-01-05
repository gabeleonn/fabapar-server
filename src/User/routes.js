const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.post('/department', Controller.createDept);
router.post('/', Controller.create);

router.get('/', (req, res) => {
    return res.send('users');
});

module.exports = router;
