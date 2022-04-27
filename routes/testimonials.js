const express = require('express')
const { createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController')
// validation
const validate = require('../middlewares/validate');
const testimonialValidator = require('../validations/testimonial');

const router = express.Router()

router.post('/', validate(testimonialValidator), createTestimonial)
router.put('/:id', updateTestimonial)
router.delete('/:id', deleteTestimonial)

module.exports = router