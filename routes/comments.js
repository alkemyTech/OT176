const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const authAdmin = require('../middlewares/authAdmin');
const authOwnership = require('../middlewares/authOwnership');
const { fetchAll, createComment, update } = require('../controllers/commentsControllers');
const commentValidator = require('../validations/comments');
const authenticated = require('../middlewares/authenticated');
/* POST comments. */
router.post('/', validate(commentValidator), createComment);

/* GET COMMENTS */
router.get('/', authenticated, authAdmin, fetchAll);

/* PUT comments */
router.put('/:id', authenticated, authOwnership('Comments'), update);


module.exports = router;
