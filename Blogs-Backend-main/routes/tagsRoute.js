const express = require("express");
const catchAsync = require('../utils/catchAsync')

const {getAllTags} = require('../controllers/tags')

const router = express.Router()

router.get('/getAllTags',catchAsync(getAllTags));

module.exports = router;