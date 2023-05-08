const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');

exports.create = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id: restaurantId } = req.params;

  await Meal.create({
    name,
    price,
    restaurantId: Number(restaurantId),
  });

  return res.status(201).json({
    status: 'success',
    message: 'the meal has benn created',
  });
});

exports.findAll = catchAsync(async (req, res) => {
  const meal = await Meal.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully ',
    results: meal.length,
    meal,
  });
});

exports.findOne = catchAsync(async (req, res) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully ',
    meal,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { meal } = req;
  const { name, price } = await req.body;

  await meal.update({
    name,
    price,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been update',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { meal } = req;

  await meal.update({
    status: false,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been deleted',
  });
});

// incluir informacion restaurant en los endpoints Get
