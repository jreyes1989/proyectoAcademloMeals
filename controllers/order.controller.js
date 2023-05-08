const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const { addOrders } = require('./../utils/calculateOrder');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const Meal = require('../models/meal.model');

exports.create = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  console.log('entra');
  const order = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
  });

  //Calcular el precio para el usuario,
  // multiplicar el precio de la comida (meal) encontrada previamente,
  // por la cantidad solicitada por el usuario.

  // Crear una nueva orden, pasando el precio calculado
  // el mealId de la comida ya encontrada y la
  // cantidad solicitada por el usuario.

  return res.status(201).json({
    status: 'success',
    message: 'the order has benn created',
    order,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = Order.findAll({
    where: {
      id,
      status: 'active',
      userId: sessionUser.id,
    },

    include: [
      {
        model: Meal,
      },
      {
        model: Restaurant,
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
