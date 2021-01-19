const Service = require('./Service');

class Controller {
    async create(req, res) {
        let equipment = await Service.create(req.body, req.file);
        if (!equipment.error) {
            return res.json(equipment);
        }
        return res.json(equipment);
    }

    async findAll(req, res) {
        let equipments = await Service.findAll();
        if (!equipments.error) {
            return res.json(equipments);
        }
        return res.json(equipments);
    }

    async delete(req, res) {
        let id = req.params.id;
        let deleted = await Service.delete(id);
        if (!deleted.error) {
            return res.status(204).json();
        }
        return res.status(400).json(deleted);
    }

    async update(req, res) {
        let id = req.params.id;
        let updated = await Service.update(id, req.body);
        if (typeof updated.error === 'undefined') {
            return res.status(204).json();
        }
        return res.status(400).json(updated);
    }
}

module.exports = new Controller();
