const jwt = require('jsonwebtoken');
const {
	findById
} = require('../utils/users');

//roleId 1 = admin; roleId 2 = user

const authAdmin = async (req, res, next) => {
	const token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

	try {
		if (token) {

			console.log('token', token)
			const verifyToken = jwt.verify(token, process.env.SECRET);
			console.log('verifyToken', verifyToken)


			let tokenId=verifyToken.user_id
			const user = await findById(tokenId);




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

		}
		next();
	} catch (error) {
		return res.status(401).send('Invalid User');
	}
};

module.exports = authAdmin;