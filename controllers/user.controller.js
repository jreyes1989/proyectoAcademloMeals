const User = require('./../models/user.model');
const Order = require('./../models/order.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt');

exports.createUsers = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  //  contrasena  encriptada
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(), // toLowerCase minusculas
    email: email.toLowerCase(), // toLowerCase minusculas
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: true,
    message: 'the user has benn created',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  // validacion de contrasema sea correcta
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: true,
    message: 'the user has benn generate good',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

exports.updateUsers = catchAsync(async (req, res) => {
  const { user } = req;

  const { name, email } = await req.body;

  await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been update',
  });
});

exports.deleteUsers = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: false,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});

exports.findAllOrder = catchAsync(async (req, res) => {
  const order = await Order.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully ',
    results: order.length,
    order,
  });
});

exports.findOneOrder = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully ',
    user,
  });
});
