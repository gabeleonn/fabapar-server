const { Model, DataTypes } = require('sequelize');

class Ticket extends Model {
    static init(connection) {
        super.init(
            {},
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        //this.hasMany(models.Item, { foreignKey: 'user_id', as: 'equipments' });
        // this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
    }
}

module.exports = Ticket;
