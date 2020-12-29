const { Router } = require('express');

const router = new Router();

const Controller = require('./Controller');

router.get('/', (req, res) => {
    return res.send('ruined');
});

module.exports = router;
