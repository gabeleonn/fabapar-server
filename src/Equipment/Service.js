const Model = require('./Model');
const Maintance = require('./Maintance');

class Service {
    async create(equipment) {
        try {
            console.log(equipment.maintance);
            let maintance = await Maintance.create({
                warranty: '12/11/2021',
                mantainer: 'Gabriel NTI',
                details: 'Hello',
                date: '01/12/2020',
            });
            //let newEquipment = await Model.create(equipment);
            return maintance;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Service();
