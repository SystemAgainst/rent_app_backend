const Router = require('express');
const router = new Router();
const lessorRouter = require('./lessorRouter');
const apartmentRouter = require('./apartmentRouter');
const clientRouter = require('./clientRouter');

router.use('/lessor', lessorRouter);
router.use('/apartment', apartmentRouter);
router.use('/client', clientRouter);

module.exports = router;
