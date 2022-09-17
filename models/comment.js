'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      models.comment.belongsTo(models.restaurant)
      models.comment.belongsTo(models.user)
    }
  }
  comment.init({
    comment: DataTypes.TEXT,
    review: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};