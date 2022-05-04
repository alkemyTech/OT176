const { Slides } = require('../models');

const getSlides = async (req, res, next) => {
  try {
    const slides = await Slides.findAll({ order: [['order', 'ASC']] });
    res.json({ slides });
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const getOneSlides = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !Number(id)) throw new Error('Invalid Id');
    const slide = await Slides.findByPk(Number(id));
    if (!slide) return res.status(404).json({ message: 'Not Found' });
    res.json({ slide });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSlides,
  getOneSlides,
};
