const Lessor = require('./lessorModel');
const Passport = require('./passportModel');
const Apartment = require('./apartmentModel');

Lessor.belongsTo(Passport, { foreignKey: 'passport_id', as: 'passport' });
Passport.hasOne(Lessor, { foreignKey: 'passport_id', as: 'lessor' });

Apartment.belongsTo(Lessor, { foreignKey: 'lessor_id', as: 'lessor' });
Lessor.hasMany(Apartment, { foreignKey: 'lessor_id', as: 'apartment' });


module.exports = {
    Lessor,
    Passport,
    Apartment,
};
