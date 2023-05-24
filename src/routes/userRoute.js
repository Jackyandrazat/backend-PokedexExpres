const express = require('express');
const userController = require('../controllers/user.js');

const router = express.Router();

//Create --> POST
router.post('/', userController.createNewUser);

//READ --> GET
router.get('/', userController.getAllUser);

//UPDATE --> Patch
router.patch('/:id', userController.updateUser);

//DELETE --> DELETE
router.delete('/:id', userController.deleteUser);



module.exports = router;
