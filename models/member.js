const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The name should be provided!',
        },
        notEmpty: {
          msg: 'The name field can not be empty!',
        },
        isAlpha: {
          msg: 'Names only contains letters!',
        },
        len: {
          args: [3, 10],
          msg: 'Only names with length between 3 and 10 are allowed',
        },
      },
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
      validate: {
        notNull: {
          msg: 'The image should be provided!',
        },
        notEmpty: {
          msg: 'The image field can not be empty!',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Member',
  });
  return Member;
};
