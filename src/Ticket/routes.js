const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.post('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;
