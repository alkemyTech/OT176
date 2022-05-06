const express = require('express');

const router = express.Router();
const { categoryList, categoryCreate, categoryEdit, categoryDetail, categoryDelete } = require('../controllers/categoryController');
const categoryValidator = require('../validations/categories');
const authAdmin = require('../middlewares/authAdmin');
const awsImageUploader = require('../utils/awsImageUploader');


// Categories list
router.get('/', authAdmin, categoryList);

// Category create
router.post('/', authAdmin, categoryValidator, awsImageUploader, categoryCreate);

// Category edit
router.put('/:id', authAdmin, categoryValidator, awsImageUploader, categoryEdit);

// Category detail
router.get('/:id', authAdmin, categoryDetail);

// Category delete
router.delete('/:id', authAdmin, categoryDelete);

module.exports = router;
