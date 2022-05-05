const express = require('express');

const router = express.Router();
const { categoryCreate, categoryList, categoryDetail } = require('../controllers/categoryController');
const categoryValidator = require('../validations/categories');
const authAdmin = require('../middlewares/authAdmin');
const awsImageUploader = require('../utils/awsImageUploader');

// Category create
router.post('/categories', authAdmin, categoryValidator, awsImageUploader, categoryCreate);

// Categories list
router.get('/categories', authAdmin, categoryList);

// Category detail
router.get('/categories/:id', authAdmin, categoryDetail);

module.exports = router;
