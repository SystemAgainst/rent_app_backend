const Router = require('express');
const router = new Router();
const lessorRouter = require('./lessorRouter');


router.use('/lessor', lessorRouter);

module.exports = router;
