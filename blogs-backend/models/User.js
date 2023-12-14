const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: [true, 'username must be unique'],
        min: 3,
        max: 25
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email must be unique'],
    }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);