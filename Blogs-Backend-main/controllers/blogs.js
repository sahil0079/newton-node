const Blog = require("../models/Blog")
const Comment = require("../models/Comment")
const User = require("../models/User")
const Tag = require("../models/Tag")
//Fetch all blogs main screen
module.exports.fetchAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    res.status(201).json(blogs)
    // res.status(201).json({message : "All blogs fetched"})
}

//Fetch All BLogs w.r.t a user
module.exports.fetchAllBlogsUser = async (req, res) => {
    const { id } = req.user
    console.log(req.user);
    console.log(id);
    const blogs = await Blog.find({ user: id })
    res.status(201).json(blogs)
    // res.status(201).json({message : "All blogs fetched"})
}

module.exports.getComment = async(req,res) => {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if(!comment){
        res.status(404).json({message : "Comment doesn't exists"})
    }

    res.status(201).json(comment);
}


// Logged in user can add a blog
module.exports.addBlog = async (req, res) => {
    try {
      const { title, description, tag, imageUrl} = req.body; // Assuming you have these values in the request body
      const userId = req.user.id;
      // Create a new blog post object
    //   console.log(req.user);


      const user = await User.findById(userId);
      console.log(user);

      const newBlogPost = new Blog({
        title,
        description,
        tag : tag,
        imageUrl : imageUrl,
        user: userId, // User ObjectId who created the blog post
        username : user.username,
        upvote: 0,
        downvote: 0,
        comments: [], // Initialize as an empty array for comments
      });


  
      // Save the new blog post
      console.log(newBlogPost);
      await newBlogPost.save();

      for (const tagText of tag) {
        const existingTag = await Tag.findOne({ categoryName: tagText });
  
        if (existingTag) {
          // If the tag already exists, associate the blog with it
          existingTag.category.push(newBlogPost.id);
          await existingTag.save();
        } else {
          // If the tag doesn't exist, create a new one and associate the blog with it
          const newTag = new Tag({ categoryName: tagText, category: [newBlogPost.id] });
          await newTag.save();
        }
      }
  
      res.status(201).json({ message: 'Blog post added successfully' });
    } catch (error) {
      console.error('Error adding blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//Upvote a vlog
module.exports.voteBlog = async (req,res) => {
    
    const { voteType } = req.body;
    const userId = req.user.id
    const blogId = req.params.id
  
    try {
      // Find the blog post by its ObjectId
      const blog = await Blog.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      // Check if the user has already voted on this blog
      if (blog.votedBy.includes(userId)) {
        return res.status(400).json({ message: 'User has already voted on this blog' });
      }
  
      // Update the vote count based on voteType ('upvote' or 'downvote')
      if (voteType === 'upvote') {
        blog.upvotes++;
      } else if (voteType === 'downvote') {
        blog.downvotes++;
      } else {
        return res.status(400).json({ message: 'Invalid vote type' });
      }
  
      // Add the user to the votedBy array
      blog.votedBy.push(userId);
  
      // Save the updated blog post
      await blog.save();
  
      res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
      console.error('Error recording vote:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  







//To update a blog (Send Blogs id in req and auth token (to get the user id))


module.exports.updateBlog = async (req, res) => {
  try {
    console.log("I am here");
    const userId = req.user.id;
    const blogId = req.params.id;

    // Find the blog post by its ObjectId
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if the user owns the blog post
    if (blog.user.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this blog post' });
    }

    // Update the blog post fields
    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    if (req.body.tag) {
      blog.tag = req.body.tag;
    }
    if (req.body.imageUrl) {
      blog.imageUrl = req.body.imageUrl;
    }

    // Use findByIdAndUpdate to update the blog post
    await Blog.findByIdAndUpdate(blogId, blog);

    // Remove existing tags
    if(req.body.tag){
        const earlierTags = blog.tag;
        for (const tagText of earlierTags) {
        const existingTag = await Tag.findOne({ categoryName: tagText });
            if (existingTag) {
                existingTag.category.pull(blog.id);
                await existingTag.save();
            }
        }

        // Add new tags
        for (const tagText of req.body.tag || []) {
        const existingTag = await Tag.findOne({ categoryName: tagText });
            if (existingTag) {
                existingTag.category.push(blog.id);
                await existingTag.save();
            } else {
                const newTag = new Tag({ categoryName: tagText, category: [blog.id] });
                await newTag.save();
            }
        }

    }
    
    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//To delete a blog (Send Blogs id in req and auth token (to get the user id))
module.exports.deleteBlog = async (req, res) => {
    try {
      const userId = req.user.id; // Include blogId and userId in the request body
      const blogId = req.params.id;
      // Find the blog post by its ObjectId
      const blog = await Blog.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      // Check if the user owns the blog post
      if (blog.user.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to delete this blog post' });
      }
  
      // Delete the blog post
    //   await blog.remove();
    await Blog.findByIdAndDelete(blogId);
  
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  //Adding comments (nested as well as simple)

  // Function to add a comment to a blog post (including nested comments)
  module.exports.addCommentToBlog = async (req, res) => {
    try {
      const { message, parentCommentId } = req.body;
      const userId = req.user.id;
      const blogId = req.params.id;
  
      const blog = await Blog.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      const newComment = new Comment({
        user: userId,
        message: message,
        like: 0,
        isNested: !!parentCommentId,
        parentComment: parentCommentId,
        blog: blogId,
      });
  
      if (parentCommentId) {
        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
          return res.status(404).json({ message: 'Parent comment not found' });
        }
        parentComment.comments.push(newComment);
        await parentComment.save();
        await newComment.save();
      } else {
        blog.comments.push(newComment);
        await newComment.save()
        await blog.save();
      }
  
      res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  