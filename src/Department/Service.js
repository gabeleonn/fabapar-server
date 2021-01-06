const Model = require('./Model');

class Service {
    async create({ name }) {
        try {
            let exists = await this.exists(name);
            if (exists) {
                return { error: 'Esse departamento já existe.', status: 400 };
            }
            let dept = await Model.create({ name });
            return dept;
        } catch (e) {
            console.log(e);
            return { error: 'Erro no servidor', status: 500 };
        }
    }

    async exists(name) {
        try {
            if (name !== undefined) {
                let dept = await Model.findOne({ where: { name } });
                if (dept[0]) {
                    return true;
                }
                return false;
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    }

    async report() {
        return null;
    }
}

module.exports = new Service();
