const http = require('http');
const app = require('./app');

// const port = ENVCONFIG.PORT || 3000;
const port = 5000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`);
});