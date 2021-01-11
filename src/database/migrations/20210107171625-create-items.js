'use strict';

const { categories, status, department } = require('../../enums');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Items', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.ENUM(categories.enum),
                defaultValue: categories.default,
                allowNull: false,
            },
            specs: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM(status.enum),
                defaultValue: status.default,
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: true,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'code',
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
        await queryInterface.dropTable('Items');
    },
};
