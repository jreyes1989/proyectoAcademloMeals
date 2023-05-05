// librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// importar rutas
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const mealRoutes = require('./routes/meal.routes');
const orderRoutes = require('./routes/order.routes');

// instanciar la app de express
const app = express();
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

//routes

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
  new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});

app.use(globalErrorHandler);

module.exports = app;
