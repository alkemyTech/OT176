
const db = require('../models/index');

const findById = async (id) => {
      const user = await db.User.findByPk(id);
      console.log('userAuth', user)
      return user;
  };

  module.exports = {findById}