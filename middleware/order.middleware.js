const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const AppError = require('../utils/appError');
const User = require('../models/user.model');

exports.existOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  req.order = order;
  req.user = order.user;

  next();
});
