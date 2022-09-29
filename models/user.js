'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      models.user.hasMany(models.comment)
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
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg:'Invalid Email.'
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
  
    onlineStatus: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook('beforeCreate', (pendingUser) => {
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    pendingUser.password = hash;
  });
  
  user.prototype.validatePassword = function(typedPassword){
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); //boolean
  
    return isCorrectPassword;
  }
  
  user.prototype.toJSON = function(){
    let userData = this.get();
    delete userData.password; //this does not mean it's deleted from the database, only to view user
  
    return userData;
  }
  
  
  
    return user;
  };