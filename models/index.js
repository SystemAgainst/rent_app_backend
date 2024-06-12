const Lessor = require('./lessorModel');
const Passport = require('./passportModel');
const Apartment = require('./apartmentModel');
const Client = require('./clientModel');
const Payment = require('./paymentModel');
const Status = require('./statusModel');

Lessor.belongsTo(Passport, { foreignKey: 'passport_id', as: 'passport' });
Passport.hasOne(Lessor, { foreignKey: 'passport_id', as: 'lessor' });

Client.belongsTo(Passport, { foreignKey: 'passport_id', as: 'passport' });
Passport.hasOne(Client, { foreignKey: 'passport_id', as: 'client' });

Apartment.belongsTo(Lessor, { foreignKey: 'lessor_id', as: 'lessor' });
Lessor.hasMany(Apartment, { foreignKey: 'lessor_id', as: 'apartments' });

Client.belongsTo(Lessor, { foreignKey: 'lessorId', as: 'lessor' });
Lessor.hasMany(Client, { foreignKey: 'lessorId', as: 'clients' });

Client.belongsTo(Apartment, { foreignKey: 'apartmentId', as: 'apartment' });
Apartment.hasOne(Client, { foreignKey: 'apartmentId', as: 'client' });

Payment.belongsTo(Apartment, { foreignKey: 'apartmentId', as: 'apartment' });
Apartment.hasOne(Payment, { foreignKey: 'apartmentId', as: 'payment' });

Status.belongsTo(Apartment, { foreignKey: 'apartmentId', as: 'apartment' });
Apartment.hasOne(Status, { foreignKey: 'apartmentId', as: 'status' });

module.exports = {
    Lessor,
    Passport,
    Apartment,
    Client,
    Payment,
    Status,
};
