//node js is a server environment
//node js uses asynchronous programming


var http = require('http');



// http.createServer(function (req, res) {
//     //request => req includes details coming from client side
//     //response => res includes functions to manipulate the http response
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.end('Hello World');
// }).listen(8080);

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.end('Hello World');
// });

// server.listen(8080);


// const server = http.createServer((req, res) => {
//     //adding http headers
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('Hello World');
//     res.end();
// });

const server = http.createServer(function (req, res) {
    //adding http headers
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(req.url);
    res.end();
});

server.listen(8080, function () {
    console.log(`Server started at port 8080`)
});