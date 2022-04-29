const db = require('../models');
const sendEmail = require('../utils/sendMail');

const contactController = {
	// Find all contacts
	list: async (req, res, next) => {
		try {
			const contacts = await db.Contact.findAll({});
			return res.status(200).json({
				success: true,
				count: contacts.length,
				data: contacts,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	},
	// Store contacts

	store: async (req, res, next) => {
		try {
			// Validate user input
			if (!(req.body.email && req.body.name)) {
				res.status(400).send('Name and email are required');
			}

			//Get contact information

			const contacts = await db.Contact.create({
				name: req.body.name,
				phone: req.body.phone,
				email: req.body.email,
				message: req.body.message,
			});

			// Welcome email
			const to = req.body.email;
			const subject = 'welcome';
			const message = 'welcome';
			await sendEmail(to, subject, message);

			return res.status(201).json({
				success: true,
				data: contacts,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	},
};
module.exports = contactController;
