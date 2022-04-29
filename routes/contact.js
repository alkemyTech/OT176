const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')
const authAdmin = require('../middlewares/authOwnership')

/* GET */
router.get("/", authAdmin, contactController.list);

module.exports = router;