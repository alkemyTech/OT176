const jwt = require('jsonwebtoken');
const users = require('../utils/users');

//roleId 1 = admin; roleId 2 = user

const authAdmin = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];

	try {
		const verifyToken = jwt.verify(token, 'secret');
		const user = await users.getById(verifyToken.id);

		if (!user) {
			return res.status(404).json({
				data: {
					msg: 'User not found',
				},
			});
		} else if (user.roleId != 1) {
			return res.status(403).json({
				data: {
					msg: 'Access denied',
				},
			});
		}
		next();
	} catch (error) {
		return res.status(401).send('Invalid User');
	}
};

module.exports = { authAdmin };
