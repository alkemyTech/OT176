const db = require('../models');

const findById = async (id) => {
      const user = await db.User.findByPk(id);
      console.log('userAuth1', user)
      return user;
  };

  module.exports = {findById}