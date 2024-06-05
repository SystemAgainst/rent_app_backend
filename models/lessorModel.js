const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Lessor = sequelize.define('Lessor', {
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
        defaultValue: "LESSOR",
    },
}, {
    tableName: 'lessor',
});

module.exports = Lessor;
