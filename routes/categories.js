const express = require('express');

const router = express.Router();
const { categoryList, categoryDetail } = require('../controllers/categoryController');
const authAdmin = require('../middlewares/authAdmin');

// Categories list
router.get('/categories', authAdmin, categoryList);

// Category detail
router.get('/categories/:id', authAdmin, categoryDetail);

module.exports = router;
