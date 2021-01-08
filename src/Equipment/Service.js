const Model = require('./Model');
const Maintenance = require('./Maintenance');
const User = require('../User/Model');

class Service {
    async create(equipment) {
        try {
            let maintenance = { ...equipment.maintenance };
            delete equipment.maintenance;
            if (typeof maintenance.warranty === 'undefined') {
                maintenance = {
                    warranty: '2019-01-01',
                    maintainer: 'SISTEMA',
                    details: 'Criado sem ter manutenção.',
                };
            }

            if (equipment.status === 'EMPRESTADO' && equipment.user_id === '') {
                return {
                    error:
                        'Bad Request: Para emprestimos deve-se ter um usuário.',
                };
            }

            equipment = {
                ...equipment,
                description: `${equipment.type} ${equipment.specs} | ${equipment.brand}`.toUpperCase(),
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
                include: [
                    { model: Maintenance, as: 'maintenances' },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['department', 'firstname', 'lastname'],
                    },
                ],
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async update(id, equipment) {
        try {
            const {
                user_id,
                warranty,
                status,
                details,
                maintainer,
            } = equipment;
            if (warranty !== '' && maintainer !== '') {
                let maintenance = {
                    warranty,
                    maintainer,
                    details,
                    equipment_id: id,
                };
                await Maintenance.create(maintenance);
            }

            let result = await Model.update(
                { user_id, status },
                { where: { id } }
            );
            if (result[0] === 1) {
                return await Model.findOne({ where: { id } });
            }
            return { error: 'Bad Request: Este campo não pode ser alterado.' };
        } catch (e) {
            console.log(e);
            return { error: 'Server Error : ?' };
        }
    }

    async delete(id) {
        try {
            return await Model.destroy({ where: { id } });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }
}

module.exports = new Service();
