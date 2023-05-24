const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

//Create --> POST
router.post('/', authController.loginUsers);



module.exports = router;
