const { request, response } = require('express');
const { Op } = require('sequelize');

const { Member } = require('../models');

const memberController = {

  readAll: async (req = request, res = response) => {
    try {
      const data = await Member.findAll({
        where: {
          is_deleted: false,
        },
      });

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: 'Please contact the administrator',
      });
    }
  },
  create: async (req = request, res = response) => {
    const {
      name, image, description,
    } = req.body;

    const { facebookUrl = undefined, instagramUrl = undefined, linkedinUrl = undefined } = req.body;

    try {
      await Member.create({
        name, facebookUrl, instagramUrl, linkedinUrl, image, description,
      });

      res.status(200).json({
        msg: 'Member created successfully !',
      });
    } catch (error) {
      return res.status(400).json(
        error.errors.map((err) => `msg: ${err.message}`)[0],
      );
    }
  },

  Update: async (req = request, res = response) => {
    const { id } = req.params;
    const {
      name, image, facebookUrl, instagramUrl, linkedinUrl, description, is_deleted,
    } = req.body;

    const member = await Member.findOne({
      where: {
        id,
      },
    });

    member.update({
      name,
      image,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      description,
    });

    res.status(200).json({
      msg: `User with id: ${id} were updated successfully`,
    });
  },

  softDelete: async (req = request, res = response) => {
    const { instagramUrl = false, facebookUrl = false, linkedinUrl = false } = req.query;

    try {
      const data = await Member.findAll({
        where: {
          [Op.or]: [
            { instagramUrl },
            { facebookUrl },
            { linkedinUrl },
          ],
          [Op.and]: [
            { is_deleted: false },
          ],
        },
      });

      if (data[0]) {
        await data[0].update({ is_deleted: true });

        res.status(200).json({
          msg: 'Member has been soft-delete !!',
        });
      } else {
        res.status(404).json({
          msg: 'No members with the provided data exist in DB',
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Please contact the administrator',
      });
    }
  },

};

module.exports = memberController;
