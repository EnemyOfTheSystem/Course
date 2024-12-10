const Router = require('express');
const router = new Router();
const propertyTypeController = require('../controllers/propertyTypeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', propertyTypeController.create)
router.get('/', propertyTypeController.getAll)


module.exports = router;