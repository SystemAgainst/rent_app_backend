const Router = require('express');
const router = new Router();
const lessorRouter = require('./lessorRouter');
const apartmentRouter = require('./apartmentRouter');


router.use('/lessor', lessorRouter);
router.use('/apartment', apartmentRouter);

module.exports = router;
