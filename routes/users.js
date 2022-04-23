var express = require("express");
var router = express.Router();

const { userEdit, signup, login } = require("../controllers/userController");
const userValidation = require('../validations/user.js')

/* Edit user */
router.post("/users/:id", userEdit);

router.post('/auth/signup', userValidation.signup, signup)
router.post('/auth/login', userValidation.login, login)

module.exports = router;
