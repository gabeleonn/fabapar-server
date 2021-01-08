const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init(
            {
                code: DataTypes.INTEGER,
                firstname: DataTypes.STRING,
                lastname: DataTypes.STRING,
                branch: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
                department: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Item, {
            foreignKey: 'user_id',
            as: 'equipments',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = User;
