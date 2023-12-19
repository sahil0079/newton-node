
const Blog = require('../models/Blog');
const User = require('../models/User');

module.exports.addBlog = async (req, res) => {
    try {
        const { title, description, tag, imageUrl } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        console.log(user)

        const newBlogPost = new Blog({
            title, description, tag, imageUrl,
            user: userId, username: user.username, upvote: 0,
            downvote: 0, comments: []
        });

        await newBlogPost.save();

        res.status(201).json({ message: 'Blog post added successfully' });

    } catch (error) {
        console.error('Error adding blog post: ', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

module.exports.fetchAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
}

module.exports.fetchAllBlogsUser = async (req, res) => {
    const { id } = req.user;
    const blogs = await Blog.find({ user: id });
    res.status(200).json(blogs);
}

