const express = require("express");
const router = express.Router();
const {fetchUser} = require('../middlewares/fetchUser')
const {validateNewBlog} = require('../middlewares/validateNewBlog')
const {fetchAllBlogs,addBlog,updateBlog,deleteBlog,addCommentToBlog,voteBlog,getComment} = require('../controllers/blogs')
const catchAsync = require('../utils/catchAsync')


//Note
/*
    id in all routes refers to the blog Id
*/

//Get all blogs
router.get('/', fetchAllBlogs)

// Add new blog using : POST /api/blogs/
router.post('/addBlog', fetchUser, validateNewBlog, catchAsync(addBlog))

// Update the blog using: PUT /api/blogs
router.put('/updateBlog/:id', fetchUser, validateNewBlog, catchAsync(updateBlog))

// Delete the blog using: PUT /api/blogs
router.delete('/deleteBlog/:id', fetchUser, catchAsync(deleteBlog))

// Comment Route : Any user can comment on a post if the user is logged in
// router.put()
router.post('/addComment/:id',fetchUser,catchAsync(addCommentToBlog))

//Upvoter Downvote
router.post('/vote/:id',fetchUser,catchAsync(voteBlog)) 


//Fetch Comment

router.get("/getcomment/:id",catchAsync(getComment))    //Here it will be a comment id
module.exports = router