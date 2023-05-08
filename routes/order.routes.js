const express = require('express');

// controller
const orderController = require('../controllers/order.controller');

// middleware
const authMiddleware = require('../middleware/auth.middleware');
const orderMiddleware = require('../middleware/order.middleware');
const mealMiddleware = require('./../middleware/meal.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  mealMiddleware.existMeal,
  authMiddleware.protectAccountOwner,
  orderController.create
);

router.get(
  '/me',
  orderMiddleware.existOrder,
  mealMiddleware.existMeal,
  authMiddleware.protectAccountOwner,
  orderController.findOne
);

router
  .route('/:id')
  .patch(orderMiddleware.existOrder, orderController.update)
  .delete(orderMiddleware.existOrder, orderController.delete);

module.exports = router;
