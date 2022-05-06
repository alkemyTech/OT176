module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Members', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      facebookUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagramUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  }
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  },
};
