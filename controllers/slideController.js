const { Slides } = require('../models');
const { awsUpload } = require('../utils/awsActions');

const getSlides = async (req, res, next) => {
  try {
    const slides = await Slides.findAll({ order: [['order', 'ASC']] });
    res.json({ slides });
  } catch (error) {
    next(error);
  }
};

const createSlide = async (req, res, next) => {
  const { text, organizationId } = req.body;
  let { order } = req.body;
  try {
    if (typeof req.file === 'undefined') throw new Error('Image is required');
    if (!order) {
      order = await Slides.max('order') + 1;
    }
    const imageUrl = await awsUpload(req.file);
    const slide = await Slides.create({
      imageUrl, text, order, organizationId,
    });
    res.status(201).json({ slide });
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

const updateSlide = async (req, res, next) => {
  const { text, organizationId, order } = req.body;
  const { id } = req.params;
  try {
    if (!id) throw new Error('Invalid Id');
    const slide = await Slides.findByPk(id);
    if (!slide) throw new Error('Item not found');
    let imageUrl = slide.imageUrl || '';

    if (typeof req.file !== 'undefined') {
      // if (imageUrl !== '') {
      //   await awsDelete(imageUrl);
      // }
      imageUrl = await awsUpload(req.file);
    }

    Object.assign(slide, {
      text, organizationId, order, imageUrl,
    });
    await slide.save();

    res.json({ message: 'Update Success', slide });
  } catch (error) {
    next(error);
  }
};

const deleteSlide = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Invalid Id');
    const slide = await Slides.findByPk(id);
    if (!slide) throw new Error('Item not found');
    await slide.destroy();
    // await awsDelete(slide.imageUrl);
    res.json({ message: 'Delete Success', slide });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSlides, createSlide, getOneSlides, deleteSlide, updateSlide,
};
