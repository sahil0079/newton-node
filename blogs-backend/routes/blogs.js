const express = require('express');
const { addBlog } = require('../controllers/blogs');
const { validateNewBlog } = require('../middlewares/validateNewBlog');
const { fetchUser } = require('../middlewares/fetchUser');


const router = express.Router();

//getting all blogs http://localhost:8080/api/blogs

router.get('/');



//getting all blogs http://localhost:8080/api/blogs/addBlog

router.post('/addblog', fetchUser, validateNewBlog, addBlog);


//sign in => sendback the token from response => adding a blog token from req  => it will veru=ify the token

module.exports = router;