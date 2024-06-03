const ApiError = require("../errors/apiError");
const {INTERNAL_ERROR, USER_NOT_FOUND} = require("../errors/constants");
const { Apartment, Lessor } = require("../models");
const {logger} = require("sequelize/lib/utils/logger");

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
            let { title, description, address, square, room_count, cost, lessor_id } = req.body;

            const lessor = await Apartment.findByPk(lessor_id);

            if (!lessor) {
                return next(ApiError.badRequest(USER_NOT_FOUND));
            }

            const apartment = await Apartment.create({
                title,
                description,
                address,
                square,
                room_count,
                cost,
                lessor_id
            });

            res.status(201).json(apartment);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, address, square, room_count, cost, lessor_id } = req.body;

            const apartment = await Apartment.findByPk(id);

            if (!apartment) {
                return next(ApiError.badRequest(USER_NOT_FOUND));
            }

            await apartment.update({
                title,
                description,
                address,
                square,
                room_count,
                cost,
                lessor_id
            });

            res.status(200).json(apartment);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }
}

module.exports = new ApartmentController();