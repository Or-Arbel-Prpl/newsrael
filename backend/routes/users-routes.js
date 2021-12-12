const express = require('express');

const usersControllers = require('../controllers/users-controllers');
const router = express.Router();


//get all users
router.get('/', usersControllers.getAllUsers );

//create a new user
router.post('/', usersControllers.createUser );

router.post('/googlelogin', usersControllers.googleLogin);
router.post('/facebooklogin', usersControllers.facebookLogin);

module.exports = router;