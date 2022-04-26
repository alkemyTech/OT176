var express = require('express');
var router = express.Router();
const validate = require('../middlewares/validate');
const authAdmin = require('../middlewares/authAdmin')
const commentsControllers = require('../controllers/commentsControllers')
const commentValidator = require('../validations/comments');
/* POST comments. */
router.post('/', validate(commentValidator),authAdmin, commentsControllers.createComment);
router.post('/', authAdmin, commentsControllers.createComment);

module.exports = router; 