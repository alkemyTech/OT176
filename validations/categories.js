const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('You must complete the name field')
    .bail()
    .isString()
    .withMessage('The name must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('The name must have at least 2 characters'),
];
