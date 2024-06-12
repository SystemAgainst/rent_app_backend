const ApiError = require("../errors/apiError");
const { INTERNAL_ERROR, USER_NOT_FOUND, APARTMENT_NOT_FOUND} = require("../errors/constants");
const { Apartment, Lessor, Payment, Status, Client} = require("../models");

class ApartmentController {
    async getAll(req, res, next) {
        try {
            const apartmentList = await Apartment.findAndCountAll({
                include: [
                    {
                        model: Payment,
                        as: 'payment',
                    },
                    {
                        model: Status,
                        as: 'status',
                    },
                    {
                        model: Client,
                        as: 'client',
                    },
                ]
            });

            res.status(201).json(apartmentList);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const apartment = await Apartment.findOne({
                where: { id },
                include: [
                    {
                        model: Lessor,
                        as: 'lessor',
                    },
                    {
                        model: Payment,
                        as: 'payment'
                    },
                    {
                        model: Status,
                        as: 'status'
                    },
                ],
            });

            if (!apartment) {
                return next(ApiError.badRequest(APARTMENT_NOT_FOUND));
            }

            res.status(200).json(apartment);
        } catch (e) {
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async create(req, res, next) {
        try {
            let { title, description, address, square, room_count, cost, lessor_id } = req.body;

            const lessor = await Lessor.findByPk(lessor_id);

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

            // Создаем запись в таблице Payment
            const payment = await Payment.create({
                apartmentId: apartment.id,
                status: false
            });

            const status = await Status.create({
                apartmentId: apartment.id,
                status: "OCCUPIED",
            })

            res.status(201).json({
                ...apartment.toJSON(),
                status: status.toJSON(),
                payment: payment.toJSON(),
            });
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

    async updatePaymentStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const payment = await Payment.findByPk(id);

            if (!payment) {
                return next(ApiError.badRequest(APARTMENT_NOT_FOUND));
            }

            await payment.update({ status });
            res.status(200).json(payment);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async updateApartmentStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { statusOccupancy } = req.body;

            const status = await Status.findByPk(id);

            if (!status) {
                return next(ApiError.badRequest(APARTMENT_NOT_FOUND));
            }

            await status.update({ statusOccupancy });
            res.status(200).json(status);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;

            const apartment = await Apartment.findOne({
                where: { id },
                include: [
                    {
                        model: Payment,
                        as: 'payment'
                    },
                    {
                        model: Status,
                        as: 'status'
                    },
                ],
            });

            if (!apartment) {
                return next(ApiError.badRequest(APARTMENT_NOT_FOUND));
            }

            // Удаляем связанные записи
            if (apartment.payment) {
                await apartment.payment.destroy();
            }
            if (apartment.status) {
                await apartment.status.destroy();
            }

            await apartment.destroy();

            res.status(200).json({ message: "Apartment deleted successfully" });
        } catch (e) {
            console.error('Error deleting apartment:', e);
            return next(ApiError.internal(INTERNAL_ERROR));
        }
    }
}

module.exports = new ApartmentController();