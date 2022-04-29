const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')
const authAdmin = require('../middlewares/authOwnership')

/* GET */
router.get("/", authAdmin, contactController.list);
/* POST */
router.post("/", authAdmin, contactController.store);

module.exports = router;