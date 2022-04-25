const { Activitie } = require("../models/index");

module.exports = {
  postValidator: (req, res, next) => {
    const { name, image, content } = req.body;

    const isString = (value) => typeof value === "string";

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!content) return res.status(400).json({ error: "Content is required" });

    if (!isString(name))
      return res.status(400).json({ error: "Name must be a string" });
    if (!isString(content))
      return res.status(400).json({ error: "Content must be a string" });
    if (!isString(image))
      return res.status(400).json({ error: "Image must be a string" });

    next();
  },
  putValidator: async (req, res, next) => {
    try {
      const { name, image, content } = req.body;
      const { id } = req.params;

      const foundActivity = await Activitie.findByPk(id);

      if (!foundActivity)
        return res.status(404).json({ error: "Activity not found" });

      const isStringOrUndefined = (value) =>
        typeof value === "string" || value === undefined;

      if (!isStringOrUndefined(name))
        return res.status(400).json({ error: "Name must be a string" });
      if (!isStringOrUndefined(content))
        return res.status(400).json({ error: "Content must be a string" });
      if (!isStringOrUndefined(image))
        return res.status(400).json({ error: "Image must be a string" });

      next();
    } catch (e) {
      next(e);
    }
  },
};
