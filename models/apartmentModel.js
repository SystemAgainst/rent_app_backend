const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Apartment = sequelize.define('Apartment', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: 'Продается квартира в хорошем жилом комплексе. В квартире выполнен современный евроремонт по разработанному проекту',
        allowNull: true,
    },
    cost:  {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        defaultValue: 'Краснодар, Воронежская ул., 47/Г',
        allowNull: false,
    },
    square: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lessor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'apartment',
});

module.exports = Apartment;
