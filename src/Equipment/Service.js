const Model = require('./Model');
const Maintenance = require('./Maintenance');

class Service {
    async create(equipment) {
        try {
            let maintenance = await Maintenance.create(equipment.maintenance);
            equipment = { ...equipment, maintenance_id: maintenance.id };
            let newEquipment = await Model.create(equipment);
            return newEquipment;
        } catch (e) {
            console.log(e);
        }
    }

    async findAll() {
        try {
            return await Model.findAll({
                include: [{ model: Maintenance, as: 'maintenance' }],
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }
}

module.exports = new Service();
