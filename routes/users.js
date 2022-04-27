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
const adminAuth = require('../middlewares/authAdmin')
const awsImageUploader = require('../utils/awsImageUploader')

/* GET users listing. */
router.get('/users', authAdmin, userList)
router.post('/users/:id', userEdit)
router.post('/auth/signup', userValidation.signup, signup)
router.post('/auth/login', userValidation.login, login)
router.post('/auth/upload', adminAuth, upload, awsImageUploader)

module.exports = router
