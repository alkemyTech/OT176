const { Router } = require("express");

const router = Router();

const { postActivities } = require("../controllers/activitieController");

const { postValidator } = require("../middlewares/activitiesMiddlewares");

router.post("/", postValidator, postActivities);

module.exports = router;
