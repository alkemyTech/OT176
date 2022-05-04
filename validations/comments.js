module.exports = {
  news_id: {
    notEmpty: {
      errorMessage: 'news_id field is required',
      bail: true,
    },
  },
  body: {
    notEmpty: {
      errorMessage: 'body field is required',
      bail: true,
    },
  },
};
