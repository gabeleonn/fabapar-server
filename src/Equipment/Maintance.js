const { Sequelize } = require('sequelize');
const { Model, DataTypes } = require('sequelize');

class Maintance extends Model {
    static init(connection) {
        super.init(
            {
                id: DataTypes.INTEGER,
                date: DataTypes.DATE,
                warranty: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
                details: DataTypes.TEXT,
                mantainer: DataTypes.STRING,
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Equipment, { foreignKey: 'id', as: 'maintance' });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Maintance;
