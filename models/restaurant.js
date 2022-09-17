'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    static associate(models) {
      models.restaurant.hasMany(models.comment)
    }
  }
  restaurant.init({
    restaurantName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    address: DataTypes.INTEGER,
    phoneNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};