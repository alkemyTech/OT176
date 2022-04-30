const db = require('../models');

const categoryController = {
  // Start Categories CRUD
  categoryCreate: (req, res, next) => {

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
  categoryEdit: (req, res, next) => {

  },
  categoryDelete: (req, res, next) => {

  },
  // End Categories CRUD
};

module.exports = categoryController;
