const express = require('express');

const User = require('../models/User');
const { createUser, loginUser } = require('../controllers/auth');
const { validateUserRegister } = require('../middlewares/validateUserRegister');
const { validateUserLogin } = require('../middlewares/validateUserLogin');
const router = express.Router();


//create a new user http://localhost:8080/api/auth/createuser

//createUser is controller
router.post('/createuser', validateUserRegister, createUser)

//create a new user http://localhost:8080/api/auth/login

router.post('/login', validateUserLogin, loginUser)

//create a new user http://localhost:8080/api/auth/getUser

router.post('/getUser')



module.exports = router;