const models = require('../models');

const { Comments } = models;

module.exports = {
  // Fetch all Comments
  fetchAll: async (req, res, next) => {
    try {
      const allComments = await Comments.findAll({
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
        user_id: req.user.id,
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
    try {
      const updComments = await Comments.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updComments) {
        return res.status(404).json({
          success: false,
          error: 'No comments found',
        });
      }

      const CommentUpdated = await Comments.findByPk(req.params.id)

      return res.status(200).json({msg:'Comment successfully updated',data:CommentUpdated});
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Delete Comment

  deleteComment: async (req, res, next) => {
    try {
      const delComments = await Comments.destroy({
        where: { id: req.params.id },
      });
      if (!delComments) {
        return res.status(404).json({
          success: false,
          error: 'No comments found',
        });
      }
      return res.status(200).json('Comment successfully deleted');
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
