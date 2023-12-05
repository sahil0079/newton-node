const mongoose = require('mongoose');

//user model => field and attributes like email, password

//user schema => defines rules and structure for validating the data stored in the user model


const UserSchema = new mongoose.Schema({
    //email field

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Email Exists']

    },

    //password field
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        unique: false
    }
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

