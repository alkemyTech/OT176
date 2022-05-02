module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'facebook', {
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn('Organizations', 'linkedin', {
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn('Organizations', 'instagram', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'facebook');
    await queryInterface.removeColumn('Organizations', 'linkedin');
    await queryInterface.removeColumn('Organizations', 'instagram');
  },
};