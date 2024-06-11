const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Lessor, Passport, Client, Apartment } = require("../models");
const ApiError = require('../errors/apiError');
const {
    INTERNAL_ERROR, USER_NOT_FOUND, INVALID_DATA, EMAIL_EXIST,
} = require("../errors/constants");

const generateJwt = (id, email, role, name, last_name, middle_name, passport_number, passport_series) => {
    return jwt.sign(
        { id, email, role, name, last_name, middle_name, passport_number, passport_series },
        process.env.SECRET_KEY,
        { expiresIn: '168h' }
    )
};

class ClientController {
    async getAll(req, res, next) {
        try {
            const clientList = await Client.findAndCountAll({
                include: [
                    {
                        model: Apartment,
                        as: 'apartment',
                    },
                    {
                        model: Passport,
                        as: 'passport',
                    },
                    {
                        model: Lessor,
                        as: 'lessor',
                    },
                ],
            });

            if (clientList.count === 0) {
                return next(ApiError.badRequest(USER_NOT_FOUND));
            }

            res.status(201).json(clientList);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async createClient(req, res, next) {
        try {
            const { email, password, role, name, last_name, passport_number, passport_series, apartmentId, lessorId } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest(INVALID_DATA));
            }

            const existedUser = await Client.findOne({ where: { email } });

            if (existedUser) {
                return next(ApiError.badRequest(EMAIL_EXIST))
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            const passport = await Passport.create({
                name,
                last_name,
                passport_number,
                passport_series,
            });

            const user = await Client.create({
                email,
                password: hashedPassword,
                role,
                passport_id: passport.id,
                apartmentId,
                lessorId,
            });

            const token = generateJwt(user.id, user.email, user.role, user.lessorId, user.apartmentId);

            return res.status(201).json({ token });

        } catch (error) {
            console.error(error);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }
}

module.exports = new ClientController();
