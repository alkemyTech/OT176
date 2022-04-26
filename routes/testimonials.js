const express = require('express')
const { createTestimonial, updateTestimonial } = require('../controllers/testimonialController')
// validation
const validate = require('../middlewares/validate');
const testimonialValidator = require('../validations/testimonial');

const router = express.Router()

router.post('/', validate(testimonialValidator), createTestimonial)
router.put('/:id', updateTestimonial)

module.exports = router