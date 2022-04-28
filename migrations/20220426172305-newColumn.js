'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       
      await queryInterface.addColumn('News','userId', {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:'Users',
          key:'id'
      }
      })
  }
};
