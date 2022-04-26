const db = require('../models');

const newController = {
    //Find all news
	list: async (req, res, next) => {
		try {
			const news = await db.New.findAll({
				include: [{ association: 'Categories' }, { association: 'Users' }],
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
    //Store news

	store: async (req, res, next) => {
		try {
			const news = await db.New.create({
				name: req.body.name,
				content: req.body.content,
				image: req.body.image,
				userId: req.body.userId,
				categoryId: req.body.categoryId,
			});
			return res.status(201).json({
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
    //Update News

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

			return res.status(201).json({
				success: true,
				data: {},
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	},

    // Soft delete news (updates deletedAt column)

	softDelete: async (req, res, next) => {
		try {
			const news = await db.New.update(
				{ deletedAt: Date() },
				{ where: { id: req.params.id } }
			);

			if (!news) {
				return res.status(404).json({
					success: false,
					error: 'No news updated',
				});
			}

			return res.status(201).json({
				success: true,
				data: {},
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
			const news = await db.New.findByPk(req.params.id, {
				include: [{ association: 'Categories' }, { association: 'Users' }],
			});

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
