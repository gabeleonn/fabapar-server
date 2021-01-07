const Service = require('./Service');

class Controller {
    async create(req, res) {
        let equipment = await Service.create(req.body);
        if (equipment) {
            return res.json(equipment);
        }
        return res.json(equipment);
    }

    async findAll(req, res) {
        let at = req.params.at;
        let equipments = await Service.findAll(at);
        if (equipments) {
            return res.json(equipments);
        }
        return res.json(equipments);
    }
}

module.exports = new Controller();
