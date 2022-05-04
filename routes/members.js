const express = require('express');

const router = express.Router();

const memberController = require('../controllers/memberController');
const memberMiddleware = require('../middlewares/membersMiddleware');

router.get('/', memberMiddleware.read, memberController.readAll);

router.post('/', memberMiddleware.create, memberController.create);

router.put('/:id', memberMiddleware.update, memberController.Update);

router.delete('/:id', memberMiddleware.delete, memberController.softDelete);

module.exports = router;
