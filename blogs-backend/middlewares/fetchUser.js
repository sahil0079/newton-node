

module.exports.fetchUser = (req, res, next) => {

    //get the user from jwt token and id to req object

    const token = req.headers.authorization.split(' ')[1];

    console.log(token)

    res.status(200).json({
        token
    })
}