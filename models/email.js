'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email extends Model {
    static associate(models) {
      models.email.belongsTo(models.user)
    }
  }
  email.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    emailId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'email',
  });
  return email;
};