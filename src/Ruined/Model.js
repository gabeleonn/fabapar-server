const { Model, DataTypes } = require('sequelize');

class Ruined extends Model {
    static init(connection) {
        super.init(
            {
                name: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        // this.hasOne(models.Address, { foreignKey: 'userId', as: 'address'} );
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Ruined;
