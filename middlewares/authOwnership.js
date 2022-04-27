const jwt = require('jsonwebtoken');
const { findById } = require('../utils/users');

const authOwnership = async (req, res, next) => {
	const token =
	req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

	try {
		const verifyToken = jwt.verify(token, process.env.SECRET); //sent token
		const tokenId = verifyToken.id;
		const user = await findById(tokenId);
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
