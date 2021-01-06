const { Model, DataTypes } = require('sequelize');

const { categories, status } = require('../enums');

class Equipment extends Model {
    static init(connection) {
        super.init(
            {
                brand: DataTypes.STRING,
                type: DataTypes.STRING,
                description: DataTypes.STRING,
                details: DataTypes.TEXT,
                category: DataTypes.ENUM(categories.enum),
                status: DataTypes.ENUM(status.enum),
                maintance: DataTypes.INTEGER,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Maintance, {
            foreignKey: 'maintance',
            as: 'maintance',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Equipment;
