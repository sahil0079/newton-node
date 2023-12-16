const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//client =>(validation) server => (validation) database

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
    },
    later: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]

}, { timestamps: true });


userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });

    if (!foundUser) {
        return false
    };

    const isValid = await bcrypt.compare(password, foundUser.password);

    return isValid ? foundUser : false

}

module.exports = mongoose.model('User', userSchema);