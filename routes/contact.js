const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');
const authOwnership = require('../middlewares/authAdmin');

/* GET */
router.get('/', authAdmin, contactController.list);
/* POST */
router.post('/', authOwnership, contactController.store);

module.exports = router;
