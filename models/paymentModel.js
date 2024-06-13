const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusPayment: {
        type: DataTypes.ENUM("PAID", "NOT_PAID"),
        allowNull: false,
        defaultValue: "NOT_PAID"
    }
}, {
    tableName: 'payment',
});

module.exports = Payment;
