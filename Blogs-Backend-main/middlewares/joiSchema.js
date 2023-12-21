const Joi = require('joi');

module.exports.userSchema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(25),
    email: Joi.string().required(),
    password: Joi.string().required().min(5)
})

module.exports.userSchemaLogin = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(25),
    password: Joi.string().required().min(4)
})

module.exports.newBlogSchema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    tag: Joi.array().items(Joi.string()).default(['General']),
    imageUrl : Joi.string(),
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming it's a valid ObjectId string
  });
  




// Joi.object({
//     title: Joi.string().required().min(3),
//     description: Joi.string().required().min(3),
//     tag: Joi.string().required().min(3),
//     upvote : Joi.number(),
//     downvote : Joi.number()
// })

// const Joi = require('joi');

// const newBlogSchema = Joi.object({
//   title: Joi.string().min(3).required(),
//   description: Joi.string().min(3).required(),
//   tag: Joi.string().min(3).default('General').required(),
//   user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming it's a valid ObjectId string
//   upvote: Joi.number().integer(),
//   downvote: Joi.number().integer(),
//   comments: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), // Assuming they are valid ObjectId strings
// });

// module.exports = newBlogSchema;
