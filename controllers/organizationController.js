const db = require("../models");
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

     create: async (req, res) => {
    await Organization.create({
      name: req.body.name,
      image: req.body.image,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      welcomeText: req.body.welcomeText,
      aboutUsText: req.body.aboutUsText,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
    })
      .then((Organization) => {
        res.status(200).json(Organization);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  
    getData: async (req, res) => {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        msg: 'Org name should be provided',
      });
    }
    try {
      const data = await Organization.findOne({
        where: {
          name,
        },
      });

      const { image, phone, address,  } = data;

      if (data) {
        res.status(200).json({
          name,
          image,
          phone,
          address,
        });
      }
    } catch (error) {
      res.status(404).json({
        msg: 'The data you are trying to access is not available',
      });
    }
  },

    //Update Organization

    organizationUpdate: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
          });
        } else {
            const { name, image, address, phone, email, welcomeText, aboutUsText} = req.body;
            db.Organization.update({
                name,
                image,
                address,
                phone,
                email,
                welcomeText,
                aboutUsText,
            })
            .then((result) => {
                const resolve = {
                    status: 200,
                    message: 'Public data organization updated successfully!',
                    data: result,
                };
                res.json(resolve);
            })
            .catch(error => res.json(error));
        }
    },

  // Delete Organization

  delete: async (req, res) => {
    await Organization.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedOrganization) => {
        res.status(200).json(deletedOrganization);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
};
