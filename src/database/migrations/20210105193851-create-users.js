'use strict';

const { roles } = require('../../enums');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
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
            branch: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            role: {
                type: Sequelize.ENUM(roles.enum),
                defaultValue: roles.default,
                allowNull: false,
            },
            department: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'department',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    },
};
