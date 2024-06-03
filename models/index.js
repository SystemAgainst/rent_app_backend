const Lessor = require('./lessorModel');
const Passport = require('./passportModel');

Lessor.belongsTo(Passport, { foreignKey: 'passport_id', as: 'passport' });
Passport.hasOne(Lessor, { foreignKey: 'passport_id', as: 'lessor' });


module.exports = {
    Lessor,
    Passport
};
