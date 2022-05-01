const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');

/* GET */
router.get('/', contactController.list);
/* POST */
router.post('/', authAdmin, contactController.store);

module.exports = router;
