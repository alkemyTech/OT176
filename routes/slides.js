const express = require('express');
const { getSlides } = require('../controllers/slideController');
const authenticated = require('../middlewares/authenticated');
const authAdmin = require('../middlewares/authAdmin');

const router = express.Router();

router.get('/', authenticated, authAdmin, getSlides);

module.exports = router;
