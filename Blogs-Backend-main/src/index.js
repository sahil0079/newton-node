const express = require("express");
const mongoose = require('mongoose');
const authRoute = require('../routes/auth')
const blogsRoute = require('../routes/blogs')
const profileRoute = require('../routes/profileBlogs')
const tagsRoute = require('../routes/tagsRoute')
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();
const app = express()

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017'

app.use(cors());

async function connectToMongo(){
   mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    console.log("Succesfully connected to mongoDB database")
}

connectToMongo().catch(err => console.log("Some error"));


// middleware
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRoute)
app.use('/api/blogs', blogsRoute)
app.use('/api/profile',profileRoute)
app.use('/api/tags',tagsRoute)

const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log('Listening to the port 8080');
})
