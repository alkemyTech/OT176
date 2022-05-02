const db = require('../models');

const authOwnership = (model = 'Comments') => async (req, res, next) => {
  const itemId = req.params.id || req.body.id;
  const { id: userId } = req.user;
  console.log(userId)

  if (!itemId) return res.status(400).json({ message: 'id invalido' });

  try {
    const itemUser = await db[model].findByPk(itemId);
	console.log(itemUser)
    if (itemUser.user_id !== userId) return res.status(403).json({ message: 'Acceso Denegado' });
    return next();
  } catch (error) {
    return res.status(500).send('Error del Servidor');
  }
};

module.exports = authOwnership;
