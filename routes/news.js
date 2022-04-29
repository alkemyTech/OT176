const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const newValidator = require('../validations/news');
const { list, store } = require('../controllers/newController');

/* GET */
router.get('/', list);

/* POST NEWS */
router.post('/', validate(newValidator), store);

module.exports = router;
