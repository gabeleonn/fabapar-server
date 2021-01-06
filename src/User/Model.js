const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init(
            {
                code: DataTypes.INTEGER,
                firstname: DataTypes.STRING,
                lastname: DataTypes.STRING,
                branch: DataTypes.INTEGER,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
                department: DataTypes.INTEGER,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Department, {
            foreignKey: 'department',
            as: 'dept',
        });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = User;
