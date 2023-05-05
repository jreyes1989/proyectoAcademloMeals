const express = require('express');

// controller
const orderController = require('../controllers/order.controller');

// middleware
const authMiddleware = require('../middleware/auth.middleware');
const orderMiddleware = require('../middleware/order.middleware');
const mealMiddleware = require('./../middleware/meal.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', mealMiddleware.existMeal, orderController.create);

router.get('/me', orderController.findOne);

router
  .route('/:id')
  .patch(authMiddleware.protectAccountOwner, orderController.update)
  .delete(authMiddleware.protectAccountOwner, orderController.delete);

module.exports = router;
