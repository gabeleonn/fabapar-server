const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init(
            {
                firstname: DataTypes.STRING,
                lastname: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
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

module.exports = User;
