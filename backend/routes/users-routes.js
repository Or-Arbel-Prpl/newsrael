const express = require('express');

const usersControllers = require('../controllers/users-controllers');
const router = express.Router();


//get all users
router.get('/', usersControllers.getAllUsers );

//create a new user
router.post('/', usersControllers.createUser );

module.exports = router;