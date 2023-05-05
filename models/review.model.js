const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Review = db.define('review', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Review;
