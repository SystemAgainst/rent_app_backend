const ApiError = require("../errors/apiError");
const {INTERNAL_ERROR} = require("../errors/constants");
const { Apartment } = require("../models");

class ApartmentController {
    async getAll(req, res, next) {
        try {
            const apartmentList = await Apartment.findAndCountAll({});

            res.status(201).json(apartmentList);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async getOne(req, res, next) {
        try {
            const apartment = await Apartment.findOne({});

            res.status(201).json(apartment);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async create(req, res, next) {
        try {

        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async update(req, res, next) {
        try {

        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }
}

module.exports = new ApartmentController();