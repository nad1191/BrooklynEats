'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emailStorage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emailStorage.init({
    userId: DataTypes.INTEGER,
    emailId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'emailStorage',
  });
  return emailStorage;
};