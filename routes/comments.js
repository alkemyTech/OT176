const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const authAdmin = require('../middlewares/authAdmin');
const authOwnership = require('../middlewares/authOwnership');
const {
  fetchAll,
  createComment, update, deleteComment,
} = require('../controllers/commentsControllers');
const commentValidator = require('../validations/comments');
const authenticated = require('../middlewares/authenticated');
/* POST comments. */
router.post('/', authenticated, validate(commentValidator), createComment);

/* GET COMMENTS */
router.get('/', authenticated, authAdmin, fetchAll);

/* PATCH comments */
router.patch('/:id', authenticated, authOwnership('Comments'), update);

/* DELETE comments */
router.delete('/:id', authenticated, authOwnership('Comments'), deleteComment);


module.exports = router;
