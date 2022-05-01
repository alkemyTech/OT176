const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const { Member } = require('../models');

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
        // checks which social media is already taken
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
  errorsCheck: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }
    next();
  },
};

const memberMiddleware = {
  create: [
    memberValidation.socialMediaInUse,
    memberValidation.errorsCheck,
  ],
  update: [
    memberValidation.memberExists,
    memberValidation.errorsCheck,
  ],
};

module.exports = memberMiddleware;
