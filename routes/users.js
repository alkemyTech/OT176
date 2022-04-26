var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const userValidation = require('../validations/user.js')

const upload = require('../utils/multer')
const adminAuth = require('../middlewares/authAdmin')
const awsImageUploader = require('../utils/awsImageUploader')

router.post('/auth/signup', userValidation.signup, userController.signup)
router.post('/auth/login', userValidation.login, userController.login)
router.post('/auth/upload', adminAuth, upload, awsImageUploader)



module.exports = router;
