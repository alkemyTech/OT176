var express = require('express');
var router = express.Router();
const validate = require('../middlewares/validate');
const authAdmin = require('../middlewares/authOwnership')
const commentsControllers = require('../controllers/commentsControllers')
const commentValidator = require('../validations/comments');
/* POST comments. */
router.post('/', validate(commentValidator),authOwnership, commentsControllers.createComment);
router.get('/', authAdmin, commentsControllers.fetchAll);

module.exports = router;  
