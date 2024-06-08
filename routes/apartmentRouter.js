const Router = require('express');
const router = new Router();
const controller = require('../controllers/apartmentController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/create', checkRole('LESSOR'), controller.create);
router.get('/list', checkRole('LESSOR'), controller.getAll);
router.get('/:id', checkRole('LESSOR'), controller.getOne);
router.patch('/:id', checkRole('LESSOR'), controller.update);
router.patch('/:id/payment', checkRole('CLIENT'), controller.updatePaymentStatus);

module.exports = router;
