const { Model, DataTypes } = require('sequelize');

class Department extends Model {
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
        this.hasMany(models.User, { as: 'users' });
        // this.belongsTo(models.User, {
        //     foreignKey: 'id',
        //     as: 'department',
        // });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Department;
