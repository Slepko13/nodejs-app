const http = require('http');

const  routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000, (error) => {
    error ? console.log(error) : console.log("Server is running")
});
