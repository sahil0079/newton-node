

//Asynchronous program


const fs = require('fs');

function useImportedPosts(errorData, data) {
    console.log('Loading posts')
}

function immediately() {
    console.log('Run me at last')
}

function greetings() {
    console.log('greetings')
}
function runFor1Sec() {
    //blocking for a sec
}

fs.readFile('./posts.json', 'utf-8', useImportedPosts);
//useImportedPosts => i/o callback queue
setTimeout(greetings, 0);
//greetings => timer queue
runFor1Sec();
console.log('I m first');
setImmediate(immediately);
//immediately => check queue it will always run last

//promises => microtask queue

//res.end all the end functions => close queue 

//first all of the synchornous code gets executed
//event loop checks if the queues are empty ot not and then
//pass it to callstack to execute

//Priority queue
//1.microtask queue
//2. Timer queue
//3. I/O call back queue (90 percents of the callbacks go here)
//4. check queue
//5.close queue


//output
//'I m first'
//greetings
//Loading posts
//Run me at last