const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const authAdmin = require('../middlewares/authAdmin');
const authOwnership = require('../middlewares/authOwnership');
const { fetchAll, createComment } = require('../controllers/commentsControllers');
const commentValidator = require('../validations/comments');
/* POST comments. */
router.post('/', validate(commentValidator), createComment);
router.get('/', authAdmin, fetchAll);

module.exports = router;
