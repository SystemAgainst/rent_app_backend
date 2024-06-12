const Router = require('express');
const router = new Router();
const controller = require('../controllers/apartmentController');
const checkRole = require('../middlewares/checkRoleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', checkRole('LESSOR'), controller.create);
router.get('/list', authMiddleware, controller.getAll);
router.get('/:id', checkRole('LESSOR'), controller.getOne);
router.patch('/:id', checkRole('LESSOR'), controller.update);
router.patch('/:id/payment', checkRole('CLIENT'), controller.updatePaymentStatus);
router.delete('/:id', checkRole('LESSOR'), controller.remove);

module.exports = router;
