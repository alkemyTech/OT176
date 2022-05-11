const { Testimonials } = require('../models');

const getTestimonials = async (req, res, next) => {
  const { limit = 10, page = 0 } = req.query;
  try {
    const testimonials = await Testimonials.findAndCountAll({
      limit: +limit,
      offset: limit * page,
    });
    const { count: totalItems, rows: results } = testimonials;
    const totalPages = Math.ceil(totalItems / limit);
    res.json({
      prevPage: page <= 0 ? '' : +page - 1,
      nextPage: page >= totalPages ? '' : +page + 1,
      currentPage: page ? +page : 0,
      totalPages,
      totalItems,
      results,
    });
  } catch (error) {
    next(error);
  }
};

const getOneTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    // codigo
    res.json({ testimonial: `base datos para ${id} testimonial` });
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { name, content, image } = req.body;
    const newTestimonial = await Testimonials.create({ name, content, image });
    res.status(201).json({ testimonial: newTestimonial });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    if (!id) throw new Error('Invalid Id');
    const testimonial = await Testimonials.findByPk(id);
    if (!testimonial) throw new Error('Item not found');
    Object.assign(testimonial, data);
    await testimonial.save();

    res.json({ testimonial });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Invalid Id');
    const testimonial = await Testimonials.findByPk(id);
    if (!testimonial) throw new Error('Item not found');
    await testimonial.destroy();
    res.json({ message: 'Delete Success', testimonial });
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
