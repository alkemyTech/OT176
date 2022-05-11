const { validationResult } = require('express-validator');
const db = require('../models');
const { Category } = require('../models');

const categoryController = {
  // Start Categories CRUD
  categoryCreate: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, description, image } = req.body;
    db.Category.create({
      name,
      description,
      image,
    })
      .then((result) => {
        const response = {
          status: 200,
          message: 'Category created successfully!',
          data: result,
        };
        res.json(response);
      })
      .catch((error) => res.json(error));
  },
  categoryList: async (req, res) => {
    const { limit = 10, page = 0 } = req.query;
    try {
      const categories = await Category.findAndCountAll({
        limit: +limit,
        offset: limit * page,
      });
      const { count: totalItems, rows: results } = categories;
      const totalPages = Math.ceil(totalItems / limit);
      res.json({
        prevPage: page <= 0 ? '' : +page - 1,
        nextPage: page >= totalPages ? '' : +page + 1,
        currentPage: page ? +page : 0,
        totalPages,
        totalItems,
        results,
      });
    } catch (error) {
      next(error);
    }
  },
  categoryEdit: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const category = db.Category.findByPk(req.params.id);
    if (category === null) {
      const response = {
        status: 404,
        message: 'Category not found',
        data: category,
      };
      res.json(response);
    } else {
      const { name, description, image } = req.body;
      db.Category.update(
        {
          name,
          description,
          image,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((result) => {
          const response = {
            status: 200,
            message: 'Category updated successfully!',
            data: result,
          };
          res.json(response);
        })
        .catch((error) => res.json(error));
    }
  },
  categoryDetail: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
  categoryDelete: (req, res) => {
    const category = db.Category.findByPk(req.params.id);
    if (category === null) {
      const resolve = {
        status: 404,
        message: 'Category not found',
        data: category,
      };
      res.json(resolve);
    } else {
      db.Category.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((result) => {
          const resolve = {
            status: 204,
            message: 'Category deleted successfully!',
            data: result,
          };
          res.json(resolve);
        })
        .catch((error) => res.json(error));
    }
  },
  // End Categories CRUD
};

module.exports = categoryController;
