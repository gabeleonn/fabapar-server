const Model = require('./Model');
const Maintenance = require('./Maintenance');

class Service {
    async create(equipment) {
        try {
            let maintenance = { ...equipment.maintenance };
            delete equipment.maintenance;
            if (typeof maintenance.warranty === 'undefined') {
                maintenance = {
                    warranty: '2019-01-01',
                    maintainer: 'SISTEMA',
                    details: 'Criado sem ter tido manutenção.',
                };
            }
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

    async findAll(at) {
        try {
            return await Model.findAll({
                where: { status: at },
                include: [{ model: Maintenance, as: 'maintenances' }],
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }
}

module.exports = new Service();
