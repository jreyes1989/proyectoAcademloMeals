const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const AppError = require('../utils/appError');
const Meal = require('./../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.existOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log('entra1');
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
      },
    ],
  });

  console.log('prueba2'); // llega hasta aca en delete y patch

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  req.order = order;
  req.meal = order.meal;

  console.log('prueba3');

  next();
});
