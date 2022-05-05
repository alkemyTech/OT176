const db = require('../models');

const newController = {
  // Find all news
  list: async (req, res, next) => {
    try {
      const news = await db.New.findAll({

      });

      return res.status(200).json({
        success: true,
        count: news.length,
        data: news,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
  // Store news

  store: async (req, res, next) => {
    try {
      const news = await db.New.create({
        name: req.body.name,
        content: req.body.content,
        image: req.body.image,
        userId: req.user_id,
        categoryId: req.body.categoryId,
        type: req.body.type,
      });
      return res.status(201).json({
        success: true,
        data: news,
      });
    } catch (err) {
      /* return res.status(500).json({
        success: false,
        error: 'Server Error',
      }); */
      console.log('error', err)
    }
  },
  // Update News

  update: async (req, res, next) => {
    try {
      const news = await db.New.update(req.body, {
        where: { id: req.params.id },
      });

      if (!news) {
        return res.status(404).json({
          success: false,
          error: 'No news found',
        });
      }

      const newNews = await db.New.findByPk( req.params.id)
      

      return res.status(201).json({
        success: true,
        data: {newNews},
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  // Delete

  removeNew: async (req, res, next) => {
    try {
      const news = await db.New.findByPk(req.params.id);

      if (!news) {
        return res.status(404).json({
          success: false,
          error: 'No data found',
        });
      }
      await news.destroy();

      return res.status(200).json({
        success: true,
        data: 'The news has been successfully deleted',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  // find news detail

  detail: async (req, res, next) => {
    try {
      const news = await db.New.findByPk(req.params.id);

      if (!news) {
        return res.status(404).json({
          success: false,
          error: 'No news found',
        });
      }

      return res.status(200).json({
        success: true,
        data: news,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
};

module.exports = newController;
