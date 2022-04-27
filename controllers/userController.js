const db = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const userController = {
    userList: (req, res, next) => {
        db.User.findAll()
        .then((result) => {
            let response = {
            status: 200,
            message: "OK",
            data: result,
            };
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        });
    },
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
    signup: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        } else {
            db.User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then((possibleUser) => {
                if (possibleUser) {
                    res.json("User already exists");
                } else {
                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                    }).then((user) => {
                        let response = {
                            message: "Account created successfully",
                            data: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                            },
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

                        const token = jwt.sign({
                                user_id: user.id
                            },
                            process.env.SECRET,
                        )

                        res.cookie('token', token, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true
                        })

                
                        let response = {
                            user,
                            token
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
                    ok: false,
                }
                res.json(error) 
            })
        }
    },
};

module.exports = userController;
