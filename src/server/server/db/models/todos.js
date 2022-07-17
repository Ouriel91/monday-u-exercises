'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    
    static associate(models) {
      
    }
  }
  Todos.init({
    itemId: DataTypes.STRING,
    itemName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    isPokemon: DataTypes.BOOLEAN,
    imagePokemonPath: DataTypes.STRING,
    done_timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};