var express = require('express');
var router = express.Router();

const authAdmin = require('../middlewares/authAdmin');
const { userList } = require('../controllers/userController');

/* GET users listing. */
router.get('/users', authAdmin, userList);

module.exports = router;
