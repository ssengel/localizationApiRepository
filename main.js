var app = require('./app');
var http = require('http');

let server = http.createServer(app);

server.listen(8080);
