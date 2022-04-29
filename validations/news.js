module.exports = {
  name: {
    notEmpty: {
      errorMessage: 'name field is required',
      bail: true,
    },
  },
  content: {
    notEmpty: {
      errorMessage: 'content is required',
      bail: true,
    },

  },
  image: {
    notEmpty: {
      errorMessage: 'image is required',
      bail: true,
    },
  },
  userId: {
    notEmpty: {
      errorMessage: 'image is required',
      bail: true,
    },
  },
  categoryId: {
    notEmpty: {
      errorMessage: 'image is required',
      bail: true,
    },
  },
  type: {
    notEmpty: {
      errorMessage: 'image is required',
      bail: true,
    },
  },
};
