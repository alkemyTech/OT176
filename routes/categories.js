const express = require('express');

const router = express.Router();
const { categoryList, categoryCreate, categoryEdit, categoryDetail } = require('../controllers/categoryController');
const categoryValidator = require('../validations/categories');
const authAdmin = require('../middlewares/authAdmin');
const awsImageUploader = require('../utils/awsImageUploader');

// Categories list
router.get('/categories', authAdmin, categoryList);

// Category create
router.post('/categories', authAdmin, categoryValidator, awsImageUploader, categoryCreate);

// Category edit
router.put('/categories/:id', authAdmin, categoryValidator, awsImageUploader, categoryEdit);

// Category detail
router.get('/categories/:id', authAdmin, categoryDetail);

module.exports = router;
