

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoute = require('../routes/auth');
const blogsRoute = require('../routes/blogs');
const profileRoute = require('../routes/profileBlogs');
const tagsRoute = require('../routes/tagsRoute');

dotenv.config();
const app = express();

// console.log(process.env)

const dbUrl = process.env.DB_URL;

app.use(cors());

async function connectToMongoDb() {
    mongoose.connect(dbUrl);
    console.log('Successfully connected to mongo db');
}
connectToMongoDb().catch(err => console.error('Error connecting to mongo db:', err));

//middlewares

app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send('Hello WOrld')
})

app.use('/api/auth', authRoute);
app.use('/api/blogs', blogsRoute);
app.use('/api/profile', profileRoute);
app.use('/api/tags', tagsRoute);






const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}`)
});

