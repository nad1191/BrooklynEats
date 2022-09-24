'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurants extends Model {
    static associate(models) {
      models.restaurants.hasMany(models.comments);
    }
  }
  restaurants.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address1: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restaurants',
  });
  return restaurants;
};