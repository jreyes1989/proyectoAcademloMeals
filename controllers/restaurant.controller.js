const Restaurant = require('./../models/restaurant.model');
const catchAsync = require('./../utils/catchAsync');

exports.findAll = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully ',
    results: restaurants.length,
    restaurants,
  });
});

exports.create = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  await Restaurant.create({ name, address, rating });

  return res.status(201).json({
    status: 'success',
    message: 'the user has benn created',
  });
});

exports.update = catchAsync(async (req, res) => {
  const { restaurant } = req;
  const { name, address } = await req.body;

  await restaurant.update({
    name,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been update',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant.update({
    status: false,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});

exports.findOne = catchAsync(async (req, res) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully ',
    restaurant,
  });
});
