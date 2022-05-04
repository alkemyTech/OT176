const express = require('express');
const { getSlides, createSlide, deleteSlide, getOneSlides } = require('../controllers/slideController');
const authenticated = require('../middlewares/authenticated');
const authAdmin = require('../middlewares/authAdmin');
const upload = require('../utils/multer');

const router = express.Router();

router.get('/', authenticated, authAdmin, getSlides);
router.get('/:id', authenticated, authAdmin, getOneSlides);
router.post('/', authenticated, authAdmin, upload('imageUrl'), createSlide);
router.delete('/:id', authenticated, authAdmin, deleteSlide);

module.exports = router;
