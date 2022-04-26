const models = require("../models");
const Comments = models.Comments;
module.exports = {
  //Fetch all Comments
  fetchAll: async (req, res) => {
    await Comments.findAll({
      order: ['createdAt', 'DESC']
    })

      .then(function (comments) {
        res.status(200).json(comments.body);
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
      user_id: req.body.user_id,
      body: req.body.body,
      news_id: req.body.news_id
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
        commentToUpdate.user_id= req.body.user_id;
        commentToUpdate.body= req.body.body;
        commmenToUpdate.news_id=req.body.news_id;
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