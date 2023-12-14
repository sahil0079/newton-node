
const User = require('../models/User')


module.exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    //using  User model
    const user = new User({ username, email, password });
    const resp = await user.save();
    res.status(201).json({
        success: true, user: resp
    })

}