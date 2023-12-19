
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.fetchUser = (req, res, next) => {

    //get the user from jwt token and id to req object

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Authorization required' })
    }

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.error(err);
            return res.status(401).json({ message: "Invalid Token", error: err.message })
        };

        //token is valid
        req.user = decoded.user;

        // console.log(req.user);

        next();
    })
}