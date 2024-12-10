const Router = require('express');
const router = new Router();
const PropertyPaymentTermController = require('../controllers/propertyPaymentTermController');

router.post('/', PropertyPaymentTermController.create)
router.get('/', PropertyPaymentTermController.getAll)


module.exports = router;