'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facebookUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      instagramUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
      type: DataTypes.STRING,
      allowNull: true
    },
      is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
      createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
      updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  }
};