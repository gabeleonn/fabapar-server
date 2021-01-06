const Service = require('./Service');

class Controller {
    async create(req, res) {
        let equipment = await Service.create(req.body);
        if (equipment) {
            return res.json(equipment);
        }
        return res.json(equipment);
    }
}

module.exports = new Controller();
