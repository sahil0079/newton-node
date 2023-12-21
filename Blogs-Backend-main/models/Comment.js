const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Blog = require('./Blog')

const commentSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, // User who made the comment
      ref: 'User',
    },
    message: String,
    like: Number,
    isNested: Boolean,
    parentComment: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the parent comment
      ref: 'Comment',
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the associated blog post
      ref: 'Blog',
    },
    comments: [this], // Nested comments
  });
  
module.exports = mongoose.model('Comment', commentSchema);