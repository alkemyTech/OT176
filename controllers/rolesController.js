const models = require("../models");
const Roles = models.Roles;
module.exports = {
  //Fetch all Role
  fetchAll: async (req, res) => {
    await Roles.findAll()

      .then(function (roles) {
        res.status(200).json(roles);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Fetch a Roles

  fetchOne: async (req, res) => {
    await Roles.findByPk(req.params.id)

      .then(function (role) {
        res.status(200).json(role);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  // Create Role

  create: async (req, res) => {
    await Roles.create({
      name: req.body.name,
      description: req.body.description,
    })

      .then(function (role) {
        res.status(200).json(role);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Update Role

  update: async (req, res) => {
    await Roles.findByPk(req.params.id)

      .then(function (roleToUpdate) {
        roleToUpdate.name = req.body.name;
        roleToUpdate.description = req.body.description;
        roleToUpdate.save();
      })
      .then(function (updatedRole) {
        res.status(200).json(updatedRole);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Delete Role

  delete: async (req, res) => {
    await Roles.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (deletedRole) {
        res.status(200).json(deletedRole);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
};
