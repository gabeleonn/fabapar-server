const { Model, DataTypes } = require('sequelize');

const { categories, status } = require('../enums');

class Item extends Model {
    static init(connection) {
        super.init(
            {
                brand: DataTypes.STRING,
                type: DataTypes.STRING,
                description: DataTypes.STRING,
                details: DataTypes.TEXT,
                category: DataTypes.ENUM(categories.enum),
                status: DataTypes.ENUM(status.enum),
                maintenance_id: DataTypes.INTEGER,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Maintenance, {
            foreignKey: 'id',
            as: 'maintenance',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Item;
