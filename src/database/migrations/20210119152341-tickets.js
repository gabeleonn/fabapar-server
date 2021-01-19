'use strict';

const { ticket } = require('../../enums');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tickets', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.ENUM(ticket.categories.enum),
                defaultValue: ticket.categories.default,
                allowNull: false,
            },
            priority: {
                type: Sequelize.ENUM(ticket.priority.enum),
                defaultValue: ticket.priority.default,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM(ticket.status.enum),
                defaultValue: ticket.status.default,
                allowNull: false,
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
        await queryInterface.dropTable('Tickets');
    },
};
