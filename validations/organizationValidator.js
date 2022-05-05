const { body } = require('express-validator');

module.exports = [
  body('name').notEmpty().withMessage('You must complete the name field').bail()
    .isString()
    .withMessage('The name must be a string'),
  body('address').isString().withMessage('The name must be a string'),
  body('phone').isNumeric().withMessage('The name must be a number'),
  body('email').notEmpty().withMessage('You must complete the email field').bail()
    .isString()
    .withMessage('The email must be a string')
    .isEmail()
    .withMessage('You must to complete with a valid email format'),
  body('welcomeText').notEmpty().withMessage('You must complete the welcomeText field').bail(),
];
