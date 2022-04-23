const db = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userController = {
    userList: (req, res, next) => {
        db.User.findAll()
        .then((result) => {
            let response = {
                status: 200,
                message: "OK",
                data: result
            }
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        })
    },
};

module.exports = userController;
