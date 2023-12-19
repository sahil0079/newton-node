


const express = require('express');
const { fetchUser } = require('../middlewares/fetchUser');
const { fetchAllBlogsUser, addBlog, updateBlog, deleteBlog, addCommentToBlog } = require('../controllers/blogs');
const { validateNewBlog } = require('../middlewares/validateNewBlog');

const router = express.Router();

router.get('/', fetchUser, fetchAllBlogsUser);

router.post('/addBlog', fetchUser, validateNewBlog, addBlog);

router.put('/updateBlog/:id', fetchUser, validateNewBlog, updateBlog);


router.delete('/deleteBlog/:id', fetchUser, deleteBlog);


//any user can comment to the post

router.post('/addComment:id', fetchUser, addCommentToBlog)






module.exports = router;