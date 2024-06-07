const sequelize = require('../config/db');
const Lessor = require('./lessorModel');
const Passport = require('./passportModel');
const Apartment = require('./apartmentModel');
const Client = require('./clientModel');

Lessor.belongsTo(Passport, { foreignKey: 'passport_id', as: 'passport' });
Passport.hasOne(Lessor, { foreignKey: 'passport_id', as: 'lessor' });

Apartment.belongsTo(Lessor, { foreignKey: 'lessor_id', as: 'lessor' });
Lessor.hasMany(Apartment, { foreignKey: 'lessor_id', as: 'apartments' });

Client.belongsTo(Lessor, { foreignKey: 'lessorId', as: 'lessor' });
Lessor.hasMany(Client, { foreignKey: 'lessorId', as: 'clients' });

Client.belongsTo(Apartment, { foreignKey: 'apartmentId', as: 'apartment' });
Apartment.hasOne(Client, { foreignKey: 'apartmentId', as: 'client' });

module.exports = {
    Lessor,
    Passport,
    Apartment,
    Client,
};
