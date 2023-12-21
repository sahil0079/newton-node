const express = require("express");
const router = express.Router();
const {fetchUser} = require('../middlewares/fetchUser')
const {validateNewBlog} = require('../middlewares/validateNewBlog')
const {fetchAllBlogsUser,addBlog,updateBlog,deleteBlog,addCommentToBlog} = require('../controllers/blogs')
const catchAsync = require('../utils/catchAsync')

router.get('/', fetchUser, catchAsync(fetchAllBlogsUser))

// Get all the blogs using : POST /api/blogs/
router.post('/addBlog', fetchUser, validateNewBlog, catchAsync(addBlog))

// Update the blog using: PUT /api/blogs
router.put('/updateBlog/:id', fetchUser, validateNewBlog, catchAsync(updateBlog))

// Delete the blog using: PUT /api/blogs
router.delete('/deleteBlog/:id', fetchUser, catchAsync(deleteBlog))

// Comment Route : Any user can comment on a post if the user is logged in
// router.put()
router.post('/addComment:id',fetchUser,catchAsync(addCommentToBlog))

module.exports = router