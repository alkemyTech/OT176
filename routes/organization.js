const express = require('express');

const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const { organizationUpdate } = require('../controllers/userController');
const organizationValidator = require('../validations/organizationValidator');
const awsImageUploader = require('../utils/awsImageUploader');

// Organization update
router.post('/public', authAdmin, organizationValidator, awsImageUploader, organizationUpdate);

module.exports = router;
