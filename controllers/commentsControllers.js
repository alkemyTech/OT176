const models = require('../models');

const { Comments } = models;
module.exports = {
  // Fetch all Comments
  fetchAll: async (req, res) => {
    await Comments.findAll({
      order: ['createdAt', 'DESC'],
    })

      .then((comments) => {
        res.status(200).json(comments.body);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Fetch a Comments

  fetchOne: async (req, res) => {
    await Comments.findByPk(req.params.id)

      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Create Comment

  createComment: async (req, res) => {
    await Comments.create({
      user_id: req.body.user_id,
      body: req.body.body,
      news_id: req.body.news_id,
    })

      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Update Comment

  update: async (req, res) => {
    await Comments.findByPk(req.params.id)

      .then((commentToUpdate) => {
        commentToUpdate.user_id = req.body.user_id;
        commentToUpdate.body = req.body.body;
        commentToUpdate.news_id = req.body.news_id;
        commentToUpdate.save();
      })
      .then((updatedComment) => {
        res.status(200).json(updatedComment);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Delete Comment

  delete: async (req, res) => {
    await Comments.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedComment) => {
        res.status(200).json(deletedComment);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
};
