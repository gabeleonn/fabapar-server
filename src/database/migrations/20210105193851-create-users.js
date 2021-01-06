'use strict';

const { roles } = require('../../enums');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            code: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            branch: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            role: {
                type: Sequelize.ENUM(roles.enum),
                defaultValue: roles.default,
                allowNull: false,
            },
            department_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Departments',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
