require('dotenv').config()
const secretKey = "HimanshuDangwal"
const jwt = require('jsonwebtoken');
module.exports.fetchUser = (req, res, next) => {
    // Get user from jwt token and add id to req object
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error(err);
        return res
          .status(401)
          .json({ message: 'Invalid token', error: err.message });
      }
      
      // Token is valid, you can access the user's data from 'decoded'
      req.user = decoded.user;
      // console.log(decoded);
      console.log(req.user);
      
      next();
    })    
}
