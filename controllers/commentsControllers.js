const models = require("../models");
const Comments = models.Comments;
module.exports = {
  //Fetch all Comments
  fetchAll: async (req, res) => {
    await Comments.findAll()

      .then(function (comments) {
        res.status(200).json(comments);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Fetch a Comments

  fetchOne: async (req, res) => {
    await Comments.findByPk(req.params.id)

      .then(function (comment) {
        res.status(200).json(comment);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  // Create Role

  createComment: async (req, res) => {
    await Comments.create({
      name: req.body.name,
      description: req.body.description,
    })

      .then(function (comment) {
        res.status(200).json(comment);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Update Role

  update: async (req, res) => {
    await Comments.findByPk(req.params.id)

      .then(function (commentToUpdate) {
        commentToUpdate.name = req.body.name;
        commentToUpdate.description = req.body.description;
        commentToUpdate.save();
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
    await Comments.destroy({
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