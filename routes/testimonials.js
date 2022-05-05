const express = require('express');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const validate = require('../middlewares/validate');
const testimonialValidator = require('../validations/testimonial');
const authenticated = require('../middlewares/authenticated');
const authAdmin = require('../middlewares/authAdmin');

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', authenticated, authAdmin, validate(testimonialValidator), createTestimonial);
router.put('/:id', authenticated, authAdmin, updateTestimonial);
router.delete('/:id', authenticated, authAdmin, deleteTestimonial);

module.exports = router;
