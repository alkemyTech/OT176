const jwt = require('jsonwebtoken');
const users = require('../utils/users');

const authOwnership = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];

	try {
		const verifyToken = jwt.verify(token, 'secret'); //sent token
		const user = await users.getById(verifyToken.id); //find user by token ID
		const idParams = Number(req.params.id); //ID sent from params

		if (user.id === idParams || user.roleId === 1) {
			return next();
		}
	} catch (error) {
		return res.status(403).json({
			data: {
				msg: 'Access denied',
			},
		});
	}
};

module.exports = { authOwnership };
