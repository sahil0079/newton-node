const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Blog = require('./Blog')
const Comment = require('./Comment')
const { boolean } = require('joi');


const tagsSchema = new Schema({
    categoryName : String,
    category :[
        {
            type: mongoose.Schema.Types.ObjectId, // Blog post Id
            ref: 'Blog',
        },
    ]
});

module.exports = mongoose.model('Tag', tagsSchema);

