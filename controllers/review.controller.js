const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review.model');

exports.create = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  await Review.create({
    comment,
    rating,
    restaurantId: Number(id),
    userId: Number(uid),
  });

  return res.status(201).json({
    status: 'success',
    message: 'the user has benn created',
  });
});

exports.update = catchAsync(async (req, res) => {
  const { review } = req;
  const { comment, rating } = await req.body;

  await review.update({
    comment,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been update',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { review } = req;

  await review.update({
    status: false,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});
