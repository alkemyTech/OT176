const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');

/* GET */
router.get('/contacts', authAdmin, contactController.list);
/* POST */

module.exports = router;