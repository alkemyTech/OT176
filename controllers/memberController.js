const { sequelize } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");

const memberController = {

    readAll: async (req = request, res = response) => {
        try {
            const data = await db.Member.findAll({
                where: {
                    is_deleted: false
                }
            });

            res.status(200).json({
                data
            });

        } catch (error) {
            res.status(400).json({
                msg: 'Please contact the administrator'
            })
        }
    },

    readOne: async (req, res) => {
        const { instagramUrl, facebookUrl, linkedinUrl } = req.query

        try {
            const data = await db.Member.findAll({
                where: {
                    [Op.or]: [
                        { instagramUrl },
                        { facebookUrl },
                        { linkedinUrl },
                    ],
                    [Op.and]: [
                        { is_deleted: false }
                    ]
                }
            });

            if (data.length > 0) {
                res.status(200).json(
                    data
                )
            } else {
                res.status(404).json({
                    msg: 'Member not found in DB'
                });
            }

        } catch (error) {
            res.status(500).json({
                msg: "Please contact the administrator"
            })
        }
    },

    create: async (req, res) => {
        const { name, facebookUrl, instagramUrl, linkedinUrl, image, description, is_deleted = false } = req.body

        try {
            await db.Member.create({ name, facebookUrl, instagramUrl, linkedinUrl, image, description, is_deleted });

            res.status(200).json({
                msg: 'A new member has been created !!'
            })
        } catch (error) {
            return res.status(400).json(
                error.errors.map(err => {
                    return `msg: ${err.message}`
                })[0]
            )

        }
    },

    Update: async (req = request, res = response) => {
        const { name, facebookUrl, instagramUrl, linkedinUrl, image, description, is_deleted } = req.query;

        try {
            const data = await db.Member.findAll({
                where: {
                    [Op.or]: [
                        { instagramUrl },
                        { facebookUrl },
                        { linkedinUrl },
                    ],
                    [Op.and]: [
                        { is_deleted: false }
                    ]
                }
            });

            if (data[0]) {
                await data[0].update({ name, facebookUrl, instagramUrl, linkedinUrl, image, description, is_deleted });

                res.status(200).json({
                    msg: "Member updated !!"
                })
            } else {
                res.status(404).json({
                    msg: "No members with the provided data exist in DB"
                })
            }
        } catch (error) {
            res.status(500).json({
                msg: "Please contact the administrator"
            });
        }

    },

    softDelete: async (req = request, res = response) => {
        const { instagramUrl=false, facebookUrl=false, linkedinUrl=false } = req.query
        
        try {
            const data = await db.Member.findAll({
                where: {
                    [Op.or]: [
                        { instagramUrl },
                        {facebookUrl},
                        { linkedinUrl },
                    ],
                    [Op.and]: [
                        { is_deleted: false }
                    ]
                }
            });
            
            if(data[0]){
                await data[0].update({is_deleted:true});
                
                res.status(200).json({
                    msg:"Member has been soft-delete !!"
                })
            }else{
                res.status(404).json({
                    msg: "No members with the provided data exist in DB"
                })
            }
        } catch (error) {
            res.status(500).json({
                msg: "Please contact the administrator"
            })
        }
    },

}

module.exports = memberController