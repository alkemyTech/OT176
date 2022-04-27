const { Activity } = require("../models/index");

module.exports = {
  postActivities: async (req, res, next) => {
    try {
      const { name, image, content } = req.body;

      const activity = await Activity.create({ name, image, content });

      res.status(201).json({
        message: "Activity created successfully",
        activity,
      });
    } catch (error) {
      next(error);
    }
  },
};
