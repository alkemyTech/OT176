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
<<<<<<< HEAD
router.get('/', newController.list);
router.get('/:id', authenticated, authAdmin, newController.detail);

/* POST NEWS */
router.post('/', authenticated, authAdmin, validate(newValidator), newController.store);

/* PUT NEWS */
router.put('/:id', authenticated, authAdmin, newController.update);

/* DELETE NEWS */
router.delete('/:id', authenticated, authAdmin, newController.delete);
=======
//router.get('/', list);
//router.get('/', authenticated, list);
router.get('/:id', authenticated, authAdmin, detail);

/* POST NEWS */
router.post('/', authenticated, authAdmin, validate(newValidator), store);

/* PUT NEWS */
router.put('/:id', authenticated, authAdmin, update);

/* DELETE NEWS */
router.delete('/:id', authenticated, authAdmin, removeNew);
>>>>>>> b88785b07c6094b87bcca35fcc543e60be8eca3c

module.exports = router;
