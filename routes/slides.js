const express = require('express');
const { getSlides, getOneSlides } = require('../controllers/slideController');
const authenticated = require('../middlewares/authenticated');
const authAdmin = require('../middlewares/authAdmin');

const router = express.Router();

router.get('/', authenticated, authAdmin, getSlides);
router.get('/:id', authenticated, authAdmin, getOneSlides);

module.exports = router;
