const express = require("express");
const {createUser, loginUser, getUser,savelater} = require('../controllers/auth')
const {fetchUser} = require('../middlewares/fetchUser')
const {validateUserRegister} = require('../middlewares/validateUserRegister')
const {validateUserLogin} = require('../middlewares/validateUserLogin')
const catchAsync = require('../utils/catchAsync')


const router = express.Router()

// Create a new user using: POST /api/auth/createuser "no login required"
router.post('/createuser', validateUserRegister, catchAsync(createUser))

// authenticate a user using: POST /api/auth/login "no login required"
router.post('/login', validateUserLogin, catchAsync(loginUser))

// get logged in user details using: POST /api/auth/getuser "login required"
router.post('/getuser',fetchUser, catchAsync(getUser))

// get logged in user details using: POST /api/auth/getuser "login required"
// router.post('/forgotpassword', catchAsync(forgotPassword))

// // get logged in user details using: POST /api/auth/getuser "login required"
// router.put('/resetpassword/:resetToken', catchAsync(resetPassword))

//Save - Later Route
router.post("/savelater/:id",fetchUser, catchAsync(savelater))

module.exports = router