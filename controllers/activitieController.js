const { Activity } = require('../models/index');

module.exports = {
  postActivities: async (req, res, next) => {
    try {
      const { name, image, content } = req.body;

      const activity = await Activity.create({ name, image, content });

      res.status(201).json({
        message: 'Activity created successfully',
        activity,
      });
    } catch (error) {
      next(error);
    }
  },
  putActivities: async (req, res, next) => {
    try {
      const { name, image, content } = req.body;

      const activityToUpdate = await Activity.update({ name, image, content }, { where: { id: req.params.id } });

      if (!activityToUpdate) {
        return res.status(404).json({
          success: false,
          error: 'No activity found',
        });
      }

      const activityEdited = await Activity.findByPk(req.params.id);

      console.log('activityEdited', activityEdited);

      res.status(200).json(activityEdited);
    } catch (error) {
      console.log('error', error);
    }
  },
};
