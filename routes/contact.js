const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');
const authenticated = require('../middlewares/authenticated');

/* GET */
router.get('/', authenticated, authAdmin, contactController.list);
/* POST */
router.post('/', contactController.store);

module.exports = router;