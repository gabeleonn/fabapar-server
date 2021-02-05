const { Sequelize } = require('sequelize');
const { Model, DataTypes } = require('sequelize');

class Maintenance extends Model {
    static init(connection) {
        super.init(
            {
                warranty: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
                details: DataTypes.TEXT,
                maintainer: DataTypes.STRING,
                equipment_id: DataTypes.INTEGER,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Item, {
            foreignKey: 'equipment_id',
            as: 'equipments',
        });
    }
}

module.exports = Maintenance;
