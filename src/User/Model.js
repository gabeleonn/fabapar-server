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
                department: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
}

module.exports = User;
