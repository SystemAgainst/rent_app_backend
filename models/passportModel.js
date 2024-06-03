const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Passport = sequelize.define('Passport', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passport_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passport_series: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'passport',
});

module.exports = Passport;
