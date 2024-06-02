const jwt = require('jsonwebtoken');
const { NOT_AUTHORIZED} = require("../errors/constants");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk

        if (!token) {
            return res.status(401).json({ message: NOT_AUTHORIZED });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (e) {
        res.status(401).json({ message: NOT_AUTHORIZED });
    }
};