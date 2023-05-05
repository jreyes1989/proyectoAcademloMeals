const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const AppError = require('../utils/appError');

exports.existUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!users) return next(new AppError(`User with id: ${id} not found`, 404));

  req.users = users;
  next();
});
