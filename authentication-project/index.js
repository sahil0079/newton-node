const http = require('http');
const app = require('./app');

// import http from 'http';

const server = http.createServer(app);

server.on('listening', () => {
    console.log('Listening on port 8080');
});

server.listen(8080);