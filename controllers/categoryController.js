const db = require('../models');

const categoryController = {
  // Start Categories CRUD
  categoryCreate: (req, res, next) => {

  },
  categoryList: (req, res, next) => {

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
