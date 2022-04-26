const express = require('express')
const { createTestimonial } = require('../controllers/testimonialController')
// validation
const validate = require('../middlewares/validate');
const testimonialValidator = require('../validations/testimonial');

const router = express.Router()

router.post('/', validate(testimonialValidator), createTestimonial)

module.exports = router
