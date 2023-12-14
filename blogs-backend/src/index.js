

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoute = require('../routes/auth');

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



const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}`)
});

