'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email extends Model {
    static associate(models) {
    }
  }
  email.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    parentMessageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'email',
  });
  return email;
};