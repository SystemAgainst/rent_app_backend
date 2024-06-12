const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    role: {
        type: DataTypes.ENUM("LESSOR", "CLIENT"),
        allowNull: true,
        defaultValue: "CLIENT",
    },
    apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    lessorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'clients',
});

module.exports = Client;
