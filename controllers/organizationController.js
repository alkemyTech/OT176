const models = require("../models");
const Organization = models.Organization
module.exports = {
    //Fetch all Organization
    fetchAll: async (req, res) => {
        await Organization.findAll()

            .then(function (Organizations) {
                res.status(200).json(Organizations);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Fetch a Organization

    fetchOne: async (req, res) => {

        await Organization.findByPk(req.params.id)
            .then(function (Organization) {
                res.status(200).json(Organization);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },


    // Create Organization

    create: (req, res) => {

        await Organization.create({
            name: req.body.name,
            image: req.body.image,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            welcomeText: req.body.welcomeText,
            aboutUsText: req.body.aboutUsText
        })
            .then(function (Organization) {
                res.status(200).json(Organization);
            })
            .catch(function (error) {
                res.status(500).json(error);
            })

    },


    //Update Organization

    update: (req, res) => {
        await Organization.findByPk(req.params.id)

            .then(function (OrganizationToUpdate) {
                OrganizationToUpdate.name = req.body.name;
                OrganizationToUpdate.image = req.body.image;
                OrganizationToUpdate.address = req.body.address;
                OrganizationToUpdate.phone = req.body.phone;
                OrganizationToUpdate.email = req.body.email;
                OrganizationToUpdate.welcomeText = req.body.welcomeText;
                OrganizationToUpdate.aboutUsText = req.body.aboutUsText;
                OrganizationToUpdate.save();
            })
            .then(function (updatedOrganization) {
                res.status(200).json(updatedOrganization);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });

    },

    //Delete Organization

    delete: (req, res) => {
        await Organization.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (deletedOrganization) {
                res.status(200).json(deletedOrganization);
            })
            .catch(function (error) {
                res.status(500).json(error);
            })
    }
};
