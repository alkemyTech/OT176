const express = require('express');

const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const { organizationUpdate, create, getData } = require('../controllers/organizationController');
const organizationValidator = require('../validations/organizationValidator');
const awsImageUploader = require('../utils/awsImageUploader');

// Organization update
router.post('/public', authAdmin, organizationValidator, awsImageUploader, organizationUpdate);

router.post('/newOrg', [], create);
router.get('/public', [], getData);

module.exports = router;
