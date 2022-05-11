const { request, response } = require('express');

const { Member } = require('../models');

const memberController = {

  readAll: async (req = request, res = response) => {
    const { limit = 10, page = 0 } = req.query;
    try {
      const data = await Member.findAndCountAll({
        limit,
        offset: limit * page,
        where: {
          deletedAt: null,
        },
      });
      const total = data.count;
      const totalPages = total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
      res.status(200).json({
        Pages: totalPages,
        previousPage: `http://localhost:3000/members?page=${page <= 0 ? 0 : page > totalPages ? totalPages - 1 : page - 1}`,
        nextPage: `http://localhost:3000/members?page=${page < totalPages - 1 ? parseInt(page) + 1 : totalPages - 1}`,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: 'Please contact the administrator',
      });
    }
  },
  create: async (req = request, res = response) => {
    const {
      name, image, description, facebookUrl, instagramUrl, linkedinUrl,
    } = req.body;

    try {
      const member = await Member.create({
        name, facebookUrl, instagramUrl, linkedinUrl, image, description,
      });

      res.status(200).json({
        msg: 'Member created successfully!',
        member,
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
      name, image, facebookUrl, instagramUrl, linkedinUrl, description,
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
    const { id } = req.params;
    try {
      await Member.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        msg: 'Member has been soft-delete !!',
      });
    } catch (error) {
      res.status(500).json({
        msg: 'Please contact the administrator',
      });
    }
  },

};

module.exports = memberController;
