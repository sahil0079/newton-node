
const http = require('http');


//create a server object

const server = http.createServer((req, res) => {

    res.end('Welcome to Facebook');

});


server.listen(3000);