const Tag = require("../models/Tag")
//Fetch all blogs main screen
module.exports.getAllTags = async (req, res) => {
    const tags = await Tag.find({})
    res.status(201).json(tags)
    // res.status(201).json({message : "All blogs fetched"})
}