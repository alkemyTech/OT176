var express = require("express");
var router = express.Router();

const { userEdit } = require("../controllers/userController");

/* Edit user */
router.post("/users/:id", userEdit);

module.exports = router;
