//what is a module

//in Node a module is self contained code that performs 
//a specific task
//function, object, or any piece of functionality that can be used
//in other parts of your application


//iife
// (function x(){
//     var a = 20
//     console.log(a)
// })();

//internal modules
// const http = require('http');

//user-created modules

// const add = require('./math');

// console.log(add(10, 20))


//third party modules

// const axios = require('axios');

// axios.get()


// const logger = require('./logger');

// logger.log('Hello World !')

import { add } from "./logger.js";

console.log(add(10, 20))


