const User = require('../User/Model');
const Model = require('./Model');

class Service {
    async create(ticket) {
        try {
            return await Model.create(ticket);
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async find(code) {
        try {
            return await Model.findAll({
                where: { user_id: code },
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async findAll() {
        try {
            return await Model.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: [
                            'code',
                            'firstname',
                            'lastname',
                            'email',
                            'department',
                            'branch',
                        ],
                    },
                ],
            });
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async update(id, toUpdate, code) {
        try {
            if (await this.checkUser(id, code)) {
                let result = await Model.update(toUpdate, { where: { id } });
                if (result[0] === 1) {
                    return await Model.findOne({ where: { id } });
                }
            }
            return {
                error:
                    'Bad Request: Você não tem permissão para atualizar esse item.',
            };
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async delete(id, code) {
        try {
            if (await this.checkUser(id, code)) {
                return await Model.destroy({ where: { id } });
            } else {
                return {
                    error:
                        'Bad Request: Você não tem permissão para deletar esse item.',
                };
            }
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: ?' };
        }
    }

    async checkUser(id, code) {
        try {
            let user = await User.findOne({ where: { code } });
            let ticket = await Model.findOne({ where: { id } });
            if (user !== null && ticket !== null) {
                if (user.role === 'NORMAL') {
                    return ticket.user_id === user.code;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new Service();
