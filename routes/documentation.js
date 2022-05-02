const express = require('express');

const router = express.Router();

const documentationController = require('../controllers/documentationController');

router.get('/docs', documentationController.docs);


module.exports = router;
