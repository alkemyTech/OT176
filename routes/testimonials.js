const express = require('express');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const validate = require('../middlewares/validate');
const testimonialValidator = require('../validations/testimonial');

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', validate(testimonialValidator), createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
