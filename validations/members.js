const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const { Member } = require('../models');

const memberValidation = {
  socialMediaInUse: async (req = request, res = response, next) => {
    const { instagramUrl = false, facebookUrl = false, linkedinUrl = false } = req.body;

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
        const socialMedia = instagramUrl == user.instagramUrl ? instagramUrl : facebookUrl == user.facebookUrl ? facebookUrl : linkedinUrl;
        return res.status(400).json({
          msg: `A user is already using ${socialMedia} as social media`,
        });
      }
    } catch (error) {
      return res.status(400).json({
        msg: 'There were a problem with the request',
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

const memberMiddleware = {
  create: [
    memberValidation.socialMediaInUse,
    memberValidation.errorsCheck,
  ],
};

module.exports = memberMiddleware;
