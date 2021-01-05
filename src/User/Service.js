const bcrypt = require('bcrypt');
const Model = require('./Model');
const Department = require('../Department');
const { roles } = require('../enums');

class Service {
    async findAll() {
        try {
            let users = await Model.findAll({});
            return users;
        } catch (e) {
            return null;
        }
    }

    async create(body) {
        try {
            let user = await this.cleanUser(body);
            console.log(user);
            //let createUser = await Model.create(body);
            return user;
        } catch (e) {
            return null;
        }
    }

    async update(user, id) {
        try {
            let updated = await Model.findByPk(id).update(user);
            return updated;
        } catch (e) {
            return null;
        }
    }

    async delete(id) {
        try {
            await Model.findByPk(id).destroy();
            return '';
        } catch (e) {
            return null;
        }
    }

    async exists(email) {
        try {
            let user = await Model.findAll({ email });
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
                return 'campos a mais';
            }
            //Hashes the password
            user.password = await this.hashPassword(user.password);
            //Validates email
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const result = re.test(String(user.email).toLowerCase());
            if (!result) {
                return 'email';
            }
            //check for department
            let dept = await Department.Model.findById(user.department);
            if (!dept) {
                return 'dept';
            }
            //validates the role
            let role = roles.enum.includes(user.role);
            if (!role) {
                return 'role';
            }
            return user;
        } catch (e) {
            return 'Body vazio';
        }
    }
}

module.exports = new Service();
