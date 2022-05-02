module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('News', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('News', 'user_id');
  },
};
