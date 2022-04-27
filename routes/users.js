var express = require("express");
var router = express.Router();

const authAdmin = require('../middlewares/authAdmin');
const { userList, signup, login } = require('../controllers/userController');
const userValidation = require('../validations/user.js')

/* GET users listing. */
router.get('/users', authAdmin, userList);
router.post("/users/:id", userEdit);
router.post('/auth/signup', userValidation.signup, signup)
router.post('/auth/login', userValidation.login, login)

module.exports = router;
