const express = require('express');
const { getAllTags } = require('../controllers/tags')

const router = express.Router();

router.get('/getAllTags', getAllTags)