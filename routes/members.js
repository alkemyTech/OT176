const express = require('express');
const router = express.Router();

const memberController= require('../controllers/memberController')


router.get("/getAllExample",memberController.readAll);

router.get("/getOneExample",memberController.readOne);

router.post("/postExample",[/* Middleware to avoid repeat fb, ig and linkedIn url's in diff members needed */],memberController.create);

router.put("/putExample",memberController.Update);

router.delete("/softDeleteExample",memberController.softDelete);

module.exports = router;