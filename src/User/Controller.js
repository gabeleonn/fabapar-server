const Service = require('./Service');
const Department = require('../Department');

class Controller {
    async createDept(req, res) {
        let { name } = req.body;
        //validate name & check if does not exist
        let dept = await Department.Service.create(name);
        if (!dept.error) {
            return res.json({ data: dept, status: 200 });
        }
        return res.json({ error: dept.error, status: 400 });
    }

    async create(req, res) {
        let user = req.body;
        let newUser = Service.create(user);
        if (!newUser.error) {
            return res.json({ data: newUser, status: 200 });
        }
        return res.json({ ...newUser });
    }
}

module.exports = new Controller();
