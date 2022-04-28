module.exports = {
  name: {
    notEmpty: {
      errorMessage: 'The Name field is required',
      bail: true,
    },
    isString: {
      errorMessage: 'The Name field must be a string',
    },
  },
  content: {
    notEmpty: {
      errorMessage: 'The Content field is required',
      bail: true,
    },
    isString: {
      errorMessage: 'The Content field must be a string',
    },
  },
};
