const http = require('http');

function doSomethingOnIncoming(incomingData, functionsForOutgoingData) {
    functionsForOutgoingData.end('Welcome to facebook');
}

const server = http.createServer(doSomethingOnIncoming);
server.listen(80);



//that we have a created a new server that is running
//on port 80