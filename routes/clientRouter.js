const Router = require('express');
const router = new Router();
const controller = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/list', controller.getAll);
router.post('/add', controller.createClient);
// router.post('/login', controller.login);

module.exports = router;
