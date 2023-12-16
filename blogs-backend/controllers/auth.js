
const User = require('../models/User')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(400).json({
                error: true, message: "Error"
            })
        }
        const user = new User({ username, email, password: hash });
        const resp = await user.save();
        const data = {
            user: { id: user._id }
        }
        const authToken = jwt.sign(data, process.env.SECRET_KEY);
        res.status(201).json({
            success: true, user: resp, authToken
        })

    });
}
module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await User.findAndValidate(username, password);

    console.log(foundUser)

    if (foundUser) {
        const data = {
            user: { id: foundUser._id }
        }
        const authToken = jwt.sign(data, process.env.SECRET_KEY);
        res.status(201).json({
            success: true, authToken
        })
    } else {
        res.status(400).json({
            message: "Invalid credentials"
        })
    }

}