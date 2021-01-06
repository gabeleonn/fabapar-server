'use strict';

const { categories, status } = require('../../enums');

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
            details: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            category: {
                type: Sequelize.ENUM(categories.enum),
                defaultValue: categories.default,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM(status.enum),
                defaultValue: status.default,
                allowNull: false,
            },
            maintenance_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Maintenances',
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
        await queryInterface.dropTable('Items');
    },
};
