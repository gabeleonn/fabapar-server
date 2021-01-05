const Service = require('./Service');
const Department = require('../Department');

class Controller {
    async create(req, res) {
        const user = await Service.create(req.body);
        if (user) {
            return res.send('hello');
        }
        return res.send('hello');
    }
}

module.exports = new Controller();
