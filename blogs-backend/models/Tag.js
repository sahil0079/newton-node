const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const tagsSchema = new Schema({
    categoryName: String,
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

module.exports = mongoose.model('Tag', tagsSchema);