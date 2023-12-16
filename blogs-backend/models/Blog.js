const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//client =>(validation) server => (validation) database

const blogsSchema = new Schema({

    title: {
        type: String,
        required: true,
        min: 3
    },
    description: {
        type: String,
        required: true,
        min: 3
    },
    tag: {
        type: [String],
        default: ['General'], //default value as an array with one element
        required: true,
    },
    imageUrl: {
        type: 'String',
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //user who created this blog post
        ref: 'User'
    },
    username: String,
    upvote: Number,
    downvote: Number,
    votedBy: [
        {
            type: mongoose.Schema.Types.ObjectId, //reference to users who have voted on this blog,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, //reference to comments,
            ref: 'Comment'
        }
    ]

}, { timestamps: true });




module.exports = mongoose.model('Blog', blogsSchema);