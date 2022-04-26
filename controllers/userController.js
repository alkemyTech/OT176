const db = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userController = {
    // Start User CRUD
  userList: (req, res, next) => {

  },
  userEdit: (req, res, next) => {

  },
    signup: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        } else {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(possibleUser => {
                if (possibleUser) {
                    res.json('User already exists');
                } else {
                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                    }).then((user) => {
                        let response = {
                            message: 'Account created successfully',
                            data: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                            }
                        };
                        res.json(response);
                    });
                }
            })
        }
    },
    userDelete: (req, res, next) => {

    },
    // End User CRUD
    login: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        } else {
            db.User.findOne({
                where: {
                    email: req.body.email,
                }
            }).then((user) => {

                if (user != undefined) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        console.log('User Authenticated')

                        let response = {
                            user
                        }
                        res.json(response)
                    } else {
                        res.json('The password is incorrect')
                    }

                } else {
                    res.json('User not found')
                }
            }).catch(() => {
                let error = {
                    ok: false
                }
                res.json(error)
            })
        }
    },
};

module.exports = userController;