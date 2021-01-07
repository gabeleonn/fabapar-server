const Model = require('./Model');
const Maintenance = require('./Maintenance');

class Service {
    async create(equipment) {
        try {
            let maintenance = { ...equipment.maintenance };
            delete equipment.maintenance;
            equipment = {
                ...equipment,
                description: `${equipment.type} ${equipment.brand}`.toUpperCase(),
            };
            let newEquipment = await Model.create(equipment);
            maintenance = { ...maintenance, equipment_id: newEquipment.id };
            await Maintenance.create(maintenance);
            return newEquipment;
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: Contante um administrador.' };
        }
    }

    async findAll() {
        try {
            return await Model.findAll({
                include: [{ model: Maintenance, as: 'maintenances' }],
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }
}

module.exports = new Service();
