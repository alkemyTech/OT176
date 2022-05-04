const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const newValidator = require('../validations/news');
const {
  list, store, detail, update, removeNew,
} = require('../controllers/newController');
const authAdmin = require('../middlewares/authAdmin');
const authenticated = require('../middlewares/authenticated');

/* GET */
router.get('/', list);
router.get('/:id', authenticated, authAdmin, detail);

/* POST NEWS */
router.post('/', authenticated, authAdmin, validate(newValidator), store);

/* PUT NEWS */
router.put('/:id', authenticated, authAdmin, update);

/* DELETE NEWS */
router.delete('/:id', authenticated, authAdmin, removeNew);

module.exports = router;
