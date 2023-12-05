const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

//require a databse connection
const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');
console.log('User', User)


dbConnect();
app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        message: 'This is server response'
    })
});

//register endpoint

app.post('/register', (request, response) => {

    console.log('request.body', request.body)

    //hashing algorithm + salt

    bcrypt.hash(request.body.password, 10)
        .then((hashedPassword) => {
            console.log('hashedPassword', hashedPassword)

            //create a new user instance and collect the data
            const user = new User({
                email: request.body.email,
                password: hashedPassword,
            })
            //save the user to the db

            user
                .save()
                //return success if the new user is added to the database successfully
                .then((result) => {
                    const { email, _id } = result
                    response.status(201).send({
                        message: "User created successfully",
                        result: {
                            email,
                            _id
                        }
                    })
                })
                //catch the error if the new user was not added successfully to the database
                .catch((error) => {
                    response.status(500).send({
                        message: 'Error creating the user',
                        error
                    })
                })
        }).catch((error) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                error
            })
        })



})

//login endpoint
app.post('/login', (request, response) => {

})

module.exports = app;