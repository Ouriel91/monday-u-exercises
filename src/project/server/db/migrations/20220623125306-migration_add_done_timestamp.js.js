'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     queryInterface.addColumn('todos', 'done_timestamp',{type:Sequelize.DATE})
  },

  async down (queryInterface, Sequelize) {
    
  }
};
