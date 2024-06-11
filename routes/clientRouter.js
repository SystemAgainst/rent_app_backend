const Router = require('express');
const router = new Router();
const controller = require('../controllers/clientController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/list', controller.getAll);
router.post('/add', checkRole('LESSOR'), controller.createClient);
router.delete('/:id', checkRole('LESSOR'), controller.deleteOne);

module.exports = router;
