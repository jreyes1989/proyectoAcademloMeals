const express = require('express');

//controller
const userController = require('../controllers/user.controller');

//middleware
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');
const validations = require('./../middleware/validations.middleware');
const orderMiddleware = require('./../middleware/order.middleware');

const router = express.Router();

router.post(
  '/signup',
  validations.createUserValidation,
  userController.createUsers
);

router.post('/login', validations.loginValidation, userController.loginUser);

router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.existUser)
  .route('/:id')
  .patch(authMiddleware.protectAccountOwner, userController.updateUsers)
  .delete(authMiddleware.protectAccountOwner, userController.deleteUsers);

router.get(
  '/orders',
  userMiddleware.existUser,
  orderMiddleware.existOrder,
  //authMiddleware.protectAccountOwner,
  userController.findAllOrder
);

router.get(
  '/orders:id',
  userMiddleware.existUser,
  orderMiddleware.existOrder,
  //authMiddleware.protectAccountOwner,
  userController.findOneOrder
);

module.exports = router;
