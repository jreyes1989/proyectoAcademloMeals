const express = require('express');

// controller
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('./../controllers/review.controller');

// middleware
const authMiddleware = require('../middleware/auth.middleware');
const restaurantMiddleware = require('./../middleware/restaurant.middleware');
const reviewMiddleware = require('./../middleware/review.middleware');
const validationMiddleware = require('./../middleware/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.findAll)
  .post(
    authMiddleware.protect,
    validationMiddleware.CreateRestaurantValidation,
    authMiddleware.restrictTo('admin'),
    restaurantController.create
  );

router

  .route('/:id')
  .get(restaurantMiddleware.existRestaurant, restaurantController.findOne)
  .patch(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.update
  )
  .delete(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.delete
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.existRestaurant, //
  reviewController.create
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.existReview,
    restaurantMiddleware.existRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(authMiddleware.protectAccountOwner, reviewController.update)
  .delete(authMiddleware.protectAccountOwner, reviewController.delete);

module.exports = router;
