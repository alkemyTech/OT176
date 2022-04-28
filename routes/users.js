var express = require('express')
var router = express.Router()

const authAdmin = require('../middlewares/authAdmin')
const {
  userList,
  signup,
  login,
  userEdit
} = require('../controllers/userController')
const userValidation = require('../validations/user.js')
const upload = require('../utils/multer')
const awsImageUploader = require('../utils/awsImageUploader')
const userController = require('../controllers/userController');
const userValidation = require('../validations/user.js');

/* GET users listing. */
router.get('/users', authAdmin, userList)
router.get('/auth/me', userValidation.authorizations.token, userController.getData);
router.post('/users/:id', userEdit)
router.post('/auth/signup', userValidation.signup, signup)
router.post('/auth/login', userValidation.login, login)
router.post('/auth/upload', upload, authAdmin, awsImageUploader)
router.delete('/:id', [], userController.delete);

module.exports = router
