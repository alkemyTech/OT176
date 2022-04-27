var express = require('express')
var router = express.Router()

const authAdmin = require('../middlewares/authAdmin');
const { userList, signup, login, userEdit } = require('../controllers/userController');
const userValidation = require('../validations/user.js')
const upload = require('../utils/multer')
const awsImageUploader = require('../utils/awsImageUploader')
const imageValidator = require('../validations/image')

router.get('/users', authAdmin, userList)
router.post('/users/:id', userEdit)
router.post('/signup', userValidation.signup, signup)
router.post('/login', userValidation.login, login)
router.post('/auth/awsImgUpload', authAdmin, upload, imageValidator, awsImageUploader)

module.exports = router
