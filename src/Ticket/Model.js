const { Model, DataTypes } = require('sequelize');

const { ticket } = require('../enums');

class Ticket extends Model {
    static init(connection) {
        super.init(
            {
                description: DataTypes.STRING,
                category: DataTypes.ENUM(ticket.categories.enum),
                status: DataTypes.ENUM(ticket.status.enum),
                priority: DataTypes.ENUM(ticket.priority.enum),
                user_id: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Ticket;
