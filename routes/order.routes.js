const express = require('express');

// controller
const orderController = require('../controllers/order.controller');

// middleware
const authMiddleware = require('../middleware/auth.middleware');
const orderMiddleware = require('../middleware/order.middleware');
const mealMiddleware = require('./../middleware/meal.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

// lo hice directo al colocar protectAccountOwner
router.post(
  '/',
  //mealMiddleware.existMeal,  no es necesario porque lo hice directo al create
  //authMiddleware.protectAccountOwner,  //  al colocar protectAccountOwner me da error
  orderController.create //  aca me llega hasta el AppError  (404)
);

router.get('/me', orderController.findOne);

router
  .route('/:id')
  .patch(orderMiddleware.existOrder, orderController.update)
  .delete(orderMiddleware.existOrder, orderController.delete);

module.exports = router;
