const { Model, DataTypes } = require('sequelize');

const { categories, status, department } = require('../enums');

class Item extends Model {
    static init(connection) {
        super.init(
            {
                brand: DataTypes.STRING,
                type: DataTypes.STRING,
                specs: DataTypes.STRING,
                file: DataTypes.STRING,
                price: DataTypes.FLOAT,
                description: DataTypes.STRING,
                category: DataTypes.ENUM(categories.enum),
                status: DataTypes.ENUM(status.enum),
                user_id: DataTypes.INTEGER,
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
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        this.belongsTo(models.Ticket, {
            foreignKey: 'id',
            as: 'equipment',
        });
    }
}

module.exports = Item;
