const express = require('express');

const router = express.Router();
const { categoryList } = require('../controllers/categoryController');
const authAdmin = require('../middlewares/authAdmin');

router.get('/categories', authAdmin, categoryList);

module.exports = router;
