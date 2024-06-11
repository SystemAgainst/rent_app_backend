const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusOccupancy: {
        type: DataTypes.ENUM("OCCUPIED", "FREE"),
        allowNull: false,
        defaultValue: "OCCUPIED",
    }
}, {
    tableName: 'status',
});

module.exports = Status;
