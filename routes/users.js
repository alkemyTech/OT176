const express = require('express');

const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const {
  userList,
  signup,
  login,
  userEdit,
  getData,
} = require('../controllers/userController');
const userValidation = require('../validations/user');
const upload = require('../utils/multer');
const awsImageUploader = require('../utils/awsImageUploader');
const userController = require('../controllers/userController');
const userAuth = require('../middlewares/authenticated');
const imageValidator = require('../validations/image');

// User list
router.get('/users', authAdmin, userList);
// User edit
router.patch('/users/:id', userAuth.authenticated, userValidation.signup, imageValidator, awsImageUploader.uploadImg, userEdit);

router.get('/auth/me', userValidation.authorizations.token, getData);
router.get('/auth/me', userValidation.authorizations.token, userController.getData);
router.post('/auth/signup', userValidation.signup, signup);
router.post('/auth/login', userValidation.login, login);
router.post('/auth/awsImgUpload', authAdmin, upload, imageValidator, awsImageUploader);
router.put('/delete/:id', userController.delete);

module.exports = router;
