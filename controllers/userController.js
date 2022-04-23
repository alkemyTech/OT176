const db = require("../models");
const { validationResult } = require("express-validator");

const userController = {
  userEdit: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    } else {
      let { firstName, lastName, email, image } = req.body;
      let user = db.User.findByPk(req.params.id);
      if (user !== "") {
        db.User.update(
          {
            firstName,
            lastName,
            email,
            image,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((result) => {
            let response = {
              status: 200,
              message: "User updated successfully!",
              data: result,
            };
            res.json(response);
          })
          .catch((error) => {
            res.json(error);
          });
      } else {
        let response = {
          status: 404,
          message: "User not found!",
        };
        res.json(response);
      }
    }
  },
};

module.exports = userController;
