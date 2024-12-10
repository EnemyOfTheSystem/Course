const Router = require('express');
const router = new Router();
const emailController = require('../controllers/emailController');

router.post('/', emailController.send)

module.exports = router;