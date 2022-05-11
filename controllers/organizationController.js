const { validationResult } = require('express-validator');
const { Organization } = require('../models');

module.exports = {
  fetchAll: async (req, res) => {
    await Organization.findAll()
      .then((Organizations) => {
        res.status(200).json(Organizations);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  fetchOne: async (req, res) => {
    await Organization.findByPk(req.params.id)
      .then((data) => {
        res.status(200).json({ Organization: data });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Create Organization
  create: async (req, res) => {
    await Organization.create({
      name: req.body.name,
      image: req.body.image,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      welcomeText: req.body.welcomeText,
      aboutUsText: req.body.aboutUsText,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
    })
      .then((data) => {
        res.status(200).json({ Organization: data });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  // eslint-disable-next-line consistent-return
  getData: async (req, res) => {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        msg: 'Org name should be provided',
      });
    }
    try {
      const data = await Organization.findOne({
        where: {
          name,
        },
        include: ['slides'],
        order: [['slides', 'order', 'asc']],
      });

      const {
        image, phone, address, facebook, instagram, linkedin, slides,
      } = data;

      if (data) {
        res.status(200).json({
          name,
          image,
          phone,
          address,
          facebook,
          instagram,
          linkedin,
          slides,
        });
      }
    } catch (error) {
      // console.log(error.message)
      res.status(404).json({
        msg: 'The data you are trying to access is not available',
      });
    }
  },

  // Update Organization
  // eslint-disable-next-line consistent-return
  organizationUpdate: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      name, image, address, phone, email, welcomeText, aboutUsText,
    } = req.body;
    Organization.update({
      name,
      image,
      address,
      phone,
      email,
      welcomeText,
      aboutUsText,
    })
      .then((result) => {
        const resolve = {
          status: 200,
          message: 'Public data organization updated successfully!',
          data: result,
        };
        res.json(resolve);
      })
      .catch((error) => res.json(error));
  },

  // Delete Organization
  delete: async (req, res) => {
    await Organization.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedOrganization) => {
        res.status(200).json(deletedOrganization);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
};
