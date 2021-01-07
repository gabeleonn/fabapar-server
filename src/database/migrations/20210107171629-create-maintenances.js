'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Maintenances', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            warranty: {
                type: Sequelize.DATE,
            },
            details: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            maintainer: {
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
            equipment_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Items',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Maintenances');
    },
};
