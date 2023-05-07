const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurant.model');

exports.existMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      status: true,
      id,
    },

    include: [
      {
        model: Restaurant,
      },
    ],
  });
  console.log('si llega');
  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }
  console.log('llego2');
  req.meal = meal;

  next();
});
