const {newBlogSchema} = require('./joiSchema')
module.exports.validateNewBlog = (req,res, next) => {
    const { error } = newBlogSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        console.log(msg);
        res.status(400).json({message : msg});
    } else {
        next()
    }
}
