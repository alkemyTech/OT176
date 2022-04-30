const { findById } = require('../controllers/userController');
// roleId 1 = admin; roleId 2 = user

const authAdmin = async (req, res, next) => {
  try {
    const user = await findById(req.user.id);
    if (!user.id && user.roleId !== 1) {
      throw new Error('Access denied');
    }
    return next();
  } catch (error) {
    return res.status(403).json({
      data: {
        msg: 'Access denied',
      },
    });
  }
};

module.exports = authAdmin;
