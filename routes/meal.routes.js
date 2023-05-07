const express = require('express');

// controller
const mealController = require('../controllers/meal.controller');

// middleware
const mealMiddleware = require('./../middleware/meal.middleware');
const authMiddleware = require('./../middleware/auth.middleware');
const restaurantMiddleware = require('./../middleware/restaurant.middleware');
const validationMiddleware = require('./../middleware/validations.middleware');

const router = express.Router();

router.get('/', mealController.findAll);

router
  .route('/:id')
  .get(mealMiddleware.existMeal, mealController.findOne)
  .post(
    restaurantMiddleware.existRestaurant, // modificado
    authMiddleware.protect,
    validationMiddleware.CreateMealValidation,
    authMiddleware.restrictTo('admin'),
    mealController.create
  )
  .patch(
    mealMiddleware.existMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealController.update
  )
  .delete(
    mealMiddleware.existMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealController.delete
  );

module.exports = router;
