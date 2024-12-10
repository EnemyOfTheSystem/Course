const Router = require('express');
const router = new Router();
const propertyController = require('../controllers/propertyController');

router.post('/', propertyController.create)
router.get('/', propertyController.getAll)
router.get('/report', propertyController.downloadReport)
router.put('/', propertyController.update)
router.get('/:id', propertyController.getOne)
router.delete('/:id', propertyController.delete)


module.exports = router;