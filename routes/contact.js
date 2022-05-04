const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController');
const authAdmin = require('../middlewares/authAdmin');
const authOwnership = require('../middlewares/authOwnership');

/* GET */
router.get('/', authAdmin, contactController.list)
/* POST */
<<<<<<< OT176-41
router.post('/', authOwnership, contactController.store);
=======
router.post('/', authOwnership, contactController.store)
>>>>>>> develop

module.exports = router;
