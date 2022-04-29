const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const newValidator = require('../validations/news');
const { list, store } = require('../controllers/newController');
const authAdmin = require('../middlewares/authAdmin');
const authenticated = require('../middlewares/authenticated');

/* GET */
router.get('/', list);

/* POST NEWS */
router.post('/', authenticated, authAdmin, validate(newValidator), store);

module.exports = router;
