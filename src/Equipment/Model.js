const { Model, DataTypes } = require('sequelize');

const { categories, status } = require('../enums');

class Item extends Model {
    static init(connection) {
        super.init(
            {
                brand: DataTypes.STRING,
                type: DataTypes.STRING,
                description: DataTypes.STRING,
                category: DataTypes.ENUM(categories.enum),
                status: DataTypes.ENUM(status.enum),
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Maintenance, {
            foreignKey: 'equipment_id',
            as: 'maintenances',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Item;
