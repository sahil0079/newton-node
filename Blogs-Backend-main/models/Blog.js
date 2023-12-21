const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Comment = require('./Comment')
const { boolean } = require('joi');


const blogsSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },
  description: {
    type: String,
    required: true,
    min: 3,
  },
  tag: {
    type: [String],
    default: ['General'], // Default value as an array with one element
    required: true,
  },
  imageUrl : {
    type : String,
    default : "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // User who created the blog post
    ref: 'User',
  },
  username : String,
  upvote: Number,
  downvote: Number,
  votedBy: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to users who have voted on this blog
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to comments
      ref: 'Comment',
    },
  ],
},{ timestamps: true });

module.exports = mongoose.model('Blog', blogsSchema);

