const models = require('../models');

const { Comments } = models;

module.exports = {
  // Fetch all Comments
  fetchAll: async (req, res, next) => {
    try {
      const allComments = Comments.findAll({
        attributes: ['body'],
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(allComments);
    } catch (error) {
      next(error);
    }
  },
  // Fetch a Comments

  fetchOne: async (req, res, next) => {
    try {
      const findComment = await Comments.findByPk(req.params.id);
      res.status(200).json(findComment);
    } catch (error) {
      next(error);
    }
  },

  // Create Comment

  createComment: async (req, res, next) => {
    try {
      const newComment = await Comments.create({
        user_id: req.body.user_id,
        body: req.body.body,
        news_id: req.body.news_id,
      });
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  },

  // Update Comment

  update: async (req, res, next) => {

    /*
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
      */
  },

  // Delete Comment

  delete: async (req, res, next) => {
    /*
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
      */
  },
};
