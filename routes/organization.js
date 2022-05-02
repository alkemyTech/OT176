const express = require('express');

const router = express.Router();
const orgController = require('../controllers/organizationController');

router.post('/newOrg', [], orgController.create);
router.get('/public', [], orgController.getData);

module.exports = router;
