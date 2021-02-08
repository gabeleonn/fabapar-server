const Model = require('./Model');
const Maintenance = require('./Maintenance');
const User = require('../User/Model');

class Service {
    async create(equipment, file) {
        try {
            delete equipment.maintenance;
            if (equipment.status === 'EMPRESTADO' && equipment.user_id === '') {
                return {
                    error:
                        'Bad Request: Para emprestimos deve-se ter um usuário.',
                };
            }

            if (equipment.status === 'DISPONÍVEL' && !!equipment.user_id) {
                delete equipment.user_id;
            }

            if (equipment.price === null || equipment.price === '') {
                equipment.price = 0.0;
            }

            equipment = {
                ...equipment,
                description: `${equipment.type} ${equipment.specs} | ${equipment.brand}`.toUpperCase(),
                file: `${typeof file === 'undefined' ? null : file.path}`,
            };
            let newEquipment = await Model.create(equipment);
            return newEquipment;
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: Contante um administrador.' };
        }
    }

    async findAll() {
        try {
            return await Model.findAll({
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

    async updatable(id) {
        let updatable = await Model.findOne({ where: { id } });
        if (updatable.status === 'DESCARTADO') {
            return false;
        }
        return true;
    }

    async previousState(id) {
        let updatable = await Model.findOne({ where: { id } });
        if (updatable) {
            return updatable.status;
        }
        return null;
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

            let updatable = await this.updatable(id);

            if (!updatable) {
                return {
                    error:
                        'Bad Request: Esse item foi descartado e não pode ser alterado.',
                };
            }

            let toUpdate = {};
            if ((await this.previousState(id)) === 'MANUTENÇÃO') {
                if (warranty !== '' && maintainer !== '') {
                    let maintenance = {
                        warranty,
                        maintainer,
                        details,
                        equipment_id: id,
                    };
                    await Maintenance.create(maintenance);
                    console.log('we are here');
                }
            }

            switch (status) {
                case 'MANUTENÇÃO':
                    toUpdate = { status };
                case 'DISPONÍVEL':
                    toUpdate = { user_id: null, status };
                    break;
                case 'DESCARTADO':
                    toUpdate = { status };
                    break;
                case 'EMPRESTADO':
                    toUpdate = { user_id, status };
                    break;
                case 'FIXO':
                    toUpdate = { user_id, status };
                    break;
                default:
                    return {
                        error: 'Bad Request: Estado do item é indispensável.',
                    };
            }

            let result = await Model.update(toUpdate, { where: { id } });
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
            let updatable = await this.updatable(id);

            if (!updatable) {
                return {
                    error:
                        'Bad Request: Esse item foi descartado e não pode ser deletado.',
                };
            }
            return await Model.destroy({ where: { id } });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }
}

module.exports = new Service();
