const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monthlyPayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lessorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'clients',
});

module.exports = Client;
