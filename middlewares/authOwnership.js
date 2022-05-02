const db = require('../models/index')

const authOwnership = (model = 'Comments')  => async (req, res, next) => {
  const itemId = req.params.id || req.body.id;
  const { id: userId } = req.user;
  if (!itemId) return res.status(400).json({ message: 'id invalido' });

	try {
		const itemUser = await db[model].findByPk(itemId);
		if (itemUser.user_id !== userId) res.status(403).json({ message: 'Acceso Denegado' });
			return next();
	} catch (error) {
		return res.status(500).send('Server error');
	}
};

module.exports = { authOwnership };
