const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');

/* GET */
<<<<<<< HEAD
router.get('/', authAdmin, contactController.list);
/* POST */
router.post('/', authOwnership, contactController.store);
=======
router.get('/', authAdmin, contactController.list)

/* POST */
router.post('/', contactController.store);
>>>>>>> b88785b07c6094b87bcca35fcc543e60be8eca3c

module.exports = router;
