const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const newValidator = require('../validations/news');
const newController = require('../controllers/newController');

const authAdmin = require('../middlewares/authAdmin');
const authenticated = require('../middlewares/authenticated');

/* GET */
router.get('/', newController.list);
router.get('/:id', authenticated, authAdmin, newController.detail)

/* POST NEWS */
router.post('/', authenticated, authAdmin, validate(newValidator), newController.store)

/* PUT NEWS */
router.put('/:id', authenticated, authAdmin, newController.update)

/* DELETE NEWS */
router.delete('/:id', authenticated, authAdmin, newController.delete)

module.exports = router;
