const Service = require('./Service');

class Controller {
    async create(req, res) {
        const dept = await Service.create(req.body);
        if (dept) {
            return res.status(201).json(dept);
        }
        return res.status(400).json({ error: 'error' });
    }
}

module.exports = new Controller();
