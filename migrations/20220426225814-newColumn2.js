module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('News', 'categoryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('News', 'userId');
  },
};
