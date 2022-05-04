const express = require('express');

const router = express.Router();
const { categoryDetail } = require('../controllers/categoryController');
const authAdmin = require('../middlewares/authAdmin');

router.get('/categories/:id', authAdmin, categoryDetail);

module.exports = router;
