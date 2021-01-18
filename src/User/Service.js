const bcrypt = require('bcrypt');
const { roles, department } = require('../enums');
const Item = require('../Equipment/Model');

const Model = require('./Model');

const jwt = require('jsonwebtoken');
const { auth } = require('../config');

class Service {
    async findAll() {
        try {
            let users = await Model.findAll();
            return users;
        } catch (e) {
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async getUsersEnum() {
        try {
            let users = await Model.findAll({
                attributes: ['code', 'firstname', 'lastname'],
            });

            return users;
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async findOne(code) {
        try {
            let user = await Model.findOne({
                where: { code },
                include: { model: Item, as: 'equipments', foreignKey: 'code' },
            });
            if (user) {
                return user;
            }
            return { error: 'Bad Request: Usuário não encontrado.' };
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async create(body) {
        try {
            let user = await this.cleanUser(body);
            return await Model.create(user);
        } catch (e) {
            console.log(e);
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async update(user, code) {
        try {
            if (user.password && user.password !== '') {
                user = {
                    ...user,
                    password: await this.hashPassword(user.password),
                };
            } else {
                delete user.password;
            }
            let result = await Model.update(user, { where: { code } });
            if (result[0] === 1) {
                return await Model.findOne({ where: { code } });
            }
            return { error: 'Bad Request: Este campo não pode ser alterado.' };
        } catch (e) {
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async delete(code) {
        try {
            return (await Model.destroy({ where: { code } })) === 0
                ? { error: 'Server Error: Usuário não existe.' }
                : 0;
        } catch (e) {
            return { error: 'Server Error: Contate um administrador.' };
        }
    }

    async exists(code) {
        try {
            let user = await Model.findAll({ code });
            if (user[0]) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async login(user) {
        return (await this.comparePassword(user))
            ? this.generateToken(user.code)
            : { error: 'Bad Request: Senha e/ou Usuário incorretos.' };
    }

    async comparePassword(user) {
        let { code, password } = user;
        let dbUser = await Model.findOne({ where: { code } });
        return await bcrypt.compare(password, dbUser.password);
    }

    async generateToken(code) {
        let dbUser = await Model.findOne({ where: { code } });
        let token = await jwt.sign({ dbUser }, auth.secret, {
            expiresIn: auth.expiresAt,
        });
        return { token };
    }

    async cleanUser(user) {
        try {
            let keys = [
                'code',
                'firstname',
                'lastname',
                'email',
                'password',
                'role',
                'department',
                'branch',
            ];
            let invalid = false;
            //validates the fields
            Object.keys(user).map((att) => {
                if (!keys.includes(att)) {
                    invalid = true;
                }
            });
            if (invalid) {
                return { error: 'Bad Request: Confira o envio.' };
            }
            //Hashes the password
            user.password = await this.hashPassword(user.password);
            //Validates email
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const result = re.test(String(user.email).toLowerCase());
            if (!result) {
                return { error: 'Bad Request: Favor inserir email válido.' };
            }
            //check for department
            let dept = department.enum.includes(user.department);
            if (!dept) {
                return {
                    error: 'Bad Request: Departamento não existe.',
                };
            }
            //validates the role
            let role = roles.enum.includes(user.role);
            if (!role) {
                return {
                    error: 'Bad Request: A role do usuário deve ser definida.',
                };
            }
            return user;
        } catch (e) {
            return { error: 'Server Error: Contate um administrador.' };
        }
    }
}

module.exports = new Service();
