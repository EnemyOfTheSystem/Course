const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.create)
router.put('/', orderController.update)
router.get('/', orderController.getAll)
router.delete('/:id', orderController.delete)

module.exports = router;