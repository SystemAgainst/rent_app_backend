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
        defaultValue: 'Продается студия в жилом комплексе Фонтаны, на 10 этаже 16-этажного дома.\n' +
            '\n' +
            'В квартире выполнен современный евроремонт по разработанному проекту, каждая деталь продумана до мелочей и дополняет общую картину и атмосферу квартиры. Остается встроенная кухня с бытовой техникой. Санузел раздельный. Есть лоджия с панорамным остеклением.\n' +
            '\n' +
            'На территории жилого комплекса работают супермаркеты и круглосуточные магазины, аптека, студия красоты, бытовые услуги. Во дворе детская игровая площадка, спортивная площадка, автомобильная парковка.',
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
    room_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    lessor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'apartment',
});

module.exports = Apartment;
