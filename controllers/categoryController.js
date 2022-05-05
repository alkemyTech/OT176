const { validationResult } = require('express-validator');
const db = require('../models');

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
  categoryList: (req, res) => {
    db.Category.findAll({
      attributes: ['name'],
    })
      .then((result) => {
        const response = {
          status: 200,
          message: 'OK',
          data: result,
        };
        res.json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  categoryDetail: (req, res) => {
    db.Category.findByPk({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === null) {
          const response = {
            status: 404,
            message: 'Category not found',
            data: result,
          };
          res.json(response);
        } else {
          const response = {
            status: 200,
            message: 'OK',
            data: result,
          };
          res.json(response);
        }
      })
      .catch((error) => res.json(error));
  },
  categoryEdit: (req, res, next) => {

  },
  categoryDelete: (req, res, next) => {

  },
  // End Categories CRUD
};

module.exports = categoryController;
