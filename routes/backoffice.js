const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');


router.get('/contacts', authAdmin, contactController.list)


module.exports = router;
