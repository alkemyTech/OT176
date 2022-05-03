const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const {
  Member,
  User,
} = require('../models');
const { verifyToken } = require('../utils/jwt');

const memberValidation = {
  socialMediaInUse: async (req = request, res = response, next) => {
    const { instagramUrl, facebookUrl, linkedinUrl } = req.body;

    try {
      const user = await Member.findOne({
        where: {
          [Op.or]: [
            { instagramUrl },
            { facebookUrl },
            { linkedinUrl },
          ],
          [Op.and]: {
            is_deleted: false,
          },
        },
      });
      if (user) {
        // eslint-disable-next-line max-len
        const socialMedia = instagramUrl == user.instagramUrl ? instagramUrl : facebookUrl == user.facebookUrl ? facebookUrl : linkedinUrl;
        return res.status(400).json({
          msg: `A user is already using ${socialMedia} as social media`,
        });
      }
      next();
    } catch (error) {
      next();
    }
  },
  memberExists: async (req = request, res = response, next) => {
    try {
      const { id } = req.params;
      const member = await Member.findOne({
        where: {
          id,
          is_deleted: false,
        },
      });

      if (!member) {
        return res.status(404).json({
          msg: `No members with id:${id} were found`,
        });
      }
      next();
    } catch (error) {
      next();
    }
  },
  isAdminRole: async (req = request, res = response, next) => {
    const { id } = await verifyToken(req.headers.token);
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (user.roleId !== 1) {
      return res.status(400).json({
        msg: 'User does not have the privilegies to do this',
      });
    }
    next();
  },
  errorsCheck: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }
    next();
  },
};

module.exports = memberValidation;
