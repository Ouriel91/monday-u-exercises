'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     queryInterface.addColumn('todos', 'isPokemon',{type:Sequelize.BOOLEAN}),
     queryInterface.addColumn('todos', 'imagePokemonPath',{type:Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
  
  }
};
