const jwt = require('jsonwebtoken')
const { NOT_AUTHORIZED} = require("../errors/constants");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: NOT_AUTHORIZED});
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decoded); // Добавьте эту строку для отладки

            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"});
            }

            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({message: NOT_AUTHORIZED});
        }
    };
};
