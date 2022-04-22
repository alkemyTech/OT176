const models = require('../models');

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await models.Testimonials.findAll();
    // codigo
    res.json({ testimonials: testimonials });
  } catch (error) {
    next(error);
  }
};

const getOneTestimonial = async (req, res, next) => {
  try {
    const id = req.params.id;
    // codigo
    res.json({ testimonial: `base datos para ${id} testimonial` });
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const data = req.body;
    // codigo
    res.status(201).json({ message: 'Creado Correctamente', data });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    // codigo
    res.json({ message: 'Actualizado Correctamente', data, id });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const id = req.params.id;
    // codigo
    res.json({ message: 'Eliminado Correctamente', id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getOneTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
