const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const emailRouter = require('./emailRouter');
const propertyRouter = require('./propertyRouter');
const commentRouter = require('./commentRouter');
const orderRouter = require('./orderRouter');
const propertyTypeRouter = require('./propertyTypeRouter');
const propertyPaymentTermRouter = require('./propertyPaymentTermRouter');

router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/comment', commentRouter);
router.use('/order', orderRouter);
router.use('/propertyType', propertyTypeRouter);
router.use('/propertyPaymentTerm', propertyPaymentTermRouter);
router.use('/email', emailRouter);


module.exports = router;