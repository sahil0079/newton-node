
//mongoose
//high level abstraction and more structured approach to work with mongo db
const mongoose = require('mongoose');
require('dotenv').config();

// console.log('process', process.env)



async function dbConnect() {

    //use mongoose to connect this app to our databse using db url
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    }).catch((error) => {
        console.log('Unable to connect to MongoDB Atlas');
        console.error(error);
    })
}
module.exports = dbConnect;