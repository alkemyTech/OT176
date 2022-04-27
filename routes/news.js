var express = require('express');
var router = express.Router();
const newController = require('../controllers/newController')

/* GET */
router.get("/", newController.list);

module.exports = router;