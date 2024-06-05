const Router = require('express');
const router = new Router();
const controller = require('../controllers/lessorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/list', controller.getAll);
router.get('/auth', authMiddleware, controller.check);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/add-client', controller.addClient);
router.get('/list-clients', controller.getClients);

module.exports = router;
