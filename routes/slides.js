const express = require('express');
const {
  getSlides, createSlide, deleteSlide, getOneSlides, updateSlide,
} = require('../controllers/slideController');
const authenticated = require('../middlewares/authenticated');
const authAdmin = require('../middlewares/authAdmin');
const upload = require('../utils/multer');

const router = express.Router();

router.get('/', authenticated, authAdmin, getSlides);
router.get('/:id', authenticated, authAdmin, getOneSlides);
router.post('/', authenticated, authAdmin, upload('imageUrl'), createSlide);
router.put('/:id', authenticated, authAdmin, upload('imageUrl'), updateSlide);
router.delete('/:id', authenticated, authAdmin, deleteSlide);

module.exports = router;
