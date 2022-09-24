'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.comments);
      models.user.hasMany(models.email)
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args:[1,99],
          msg:'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args:[8,99],
          msg:'Password must be between 8 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg:'Invalid Email.'
        }
      }
    },
    onlineStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};