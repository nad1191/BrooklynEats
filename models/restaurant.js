'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    static associate(models) {
      models.restaurant.hasMany(models.comment);
    }
  }
  restaurant.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    restaurantName: DataTypes.STRING,
    address: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    cuisineType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};