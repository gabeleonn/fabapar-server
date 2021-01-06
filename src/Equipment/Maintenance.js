const { Sequelize } = require('sequelize');
const { Model, DataTypes } = require('sequelize');

class Maintenance extends Model {
    static init(connection) {
        super.init(
            {
                date: DataTypes.DATE,
                warranty: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
                details: DataTypes.TEXT,
                maintainer: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Item, {
            foreignKey: 'id',
            as: 'maintenance',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Maintenance;
