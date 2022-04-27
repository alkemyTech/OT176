const { Router } = require("express");

const router = Router();

const {
  postActivities,
  putActivities,
} = require("../controllers/activitieController");

const {
  postValidator,
  putValidator,
} = require("../middlewares/activitiesMiddlewares");

router.post("/", postValidator, postActivities);
router.put("/:id", putValidator, putActivities);

module.exports = router;
