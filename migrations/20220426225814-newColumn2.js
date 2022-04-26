'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       
      await queryInterface.addColumn('Categories','categoryId', {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:'Categories',
          key:'id'
      }
      })
  }
};