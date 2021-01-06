const Service = require('./Service');

class Controller {
    async create(req, res) {
        const user = await Service.create(req.body);
        if (!user.error) {
            return res.status(201).json(user);
        }
        return res.status(400).json(user);
    }

    async findAll(req, res) {
        const users = await Service.findAll();
        if (!users.error) {
            return res.status(200).json(users);
        }
        return res.status(400).json(users);
    }

    async findOne(req, res) {
        const code = req.params.code;
        const user = await Service.findOne(code);
        if (!user.error) {
            return res.status(200).json(user);
        }
        return res.status(400).json(user);
    }

    async update(req, res) {
        const code = req.params.code;
        const { password, department, branch, firstname, lastname } = req.body;
        const user = await Service.update(
            { password, department, branch, firstname, lastname },
            code
        );
        if (!user.error) {
            return res.status(200).json(user);
        }
        return res.status(400).json(user);
    }

    async delete(req, res) {
        const code = req.params.code;
        const user = await Service.delete(code);
        if (!user.error) {
            return res.status(204).json();
        }
        return res.status(400).json(user);
    }

    async login(req, res) {
        const test = await Service.login(req.body);
        return res.send(test);
    }
}

module.exports = new Controller();
