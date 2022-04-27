
const Models = require('../models/index');

const findById = async (id) => {
    const user = await Models.Users.findByPk(id);
    return user;
  };

  module.exports = {findById}