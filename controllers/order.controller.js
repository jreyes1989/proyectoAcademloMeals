const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');

exports.create = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;
  console.log('llega1');

  const meal = await Meal.findOne({
    //  traje a Meal por aca que por middleware tiene otra config.
    where: {
      id: mealId,
      status: true,
    },
  });

  if (!meal) {
    return next(new AppError(`Meal with  not found`, 404)); // llega hasta aqui
  }

  console.log('entra2');
  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    quantity,
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice,
  });

  return res.status(201).json({
    status: 'success',
    message: 'the order has benn created',
    order: {
      id: order.id,
      mealId: order.mealId,
      totalPrice: order.totalPrice,
      quantity: order.quantity,
      userId: order.userId,
      status: order.status,
    },
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const order = Order.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Meal,
      },
      {
        model: User,
      },
    ],
  });

  // Para el endpoint /me, se debe incluir la información de la comida que se ordenó,
  // y del restaurant de donde se pidió la comida.
  return res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully ',
    order,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'completed',
  });
  return res.status(200).json({
    status: 'success',
    message: ' The order was update successfully',
    order,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'cancelled',
  });

  return res.status(200).json({
    status: 'success',
    message: ' The order was deleted successfully',
  });
});
