'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    
    static associate(models) {
      models.comments.belongsTo(models.restaurants)
      models.comments.belongsTo(models.user)
    }
  }
  comments.init({
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};