const express = require('express');

const router = express.Router();

const memberController = require('../controllers/memberController');
const memberMiddleware = require('../validations/members');

router.get('/getAllExample', memberController.readAll);

router.get('/getOneExample', memberController.readOne);

router.post('/', memberMiddleware.create, memberController.create);

router.put('/:id', memberController.Update);

router.delete('/softDeleteExample', memberController.softDelete);

module.exports = router;
