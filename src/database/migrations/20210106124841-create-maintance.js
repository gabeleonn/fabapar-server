'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Maintances', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            warranty: {
                type: Sequelize.DATE,
            },
            details: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            mantainer: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('Maintances');
    },
};
