var http = require('http');
var sockjs = require('sockjs');
const  express = require('express'),
    app = express();

// Clients list
const clients = {};

// Broadcast to all clients
const  broadcast = (message) => {
    // iterate through each client in clients object
    for (var client in clients){
        // send the message to that client
        clients[client].write(JSON.stringify(message));
    }
}

const newMessage = (message) => {
    console.log(message);
    broadcast(JSON.parse(message));
}

// create sockjs server
const echo = sockjs.createServer();

// on new connection event
echo.on('connection', (conn) => {


    const Disconnect = ()=> {
        delete clients[conn.id];
    }

    // add this client to clients object
    clients[conn.id] = conn;
    console.log(conn.id);
    // on receive new data from client event
    conn.on('data', newMessage)

    // on connection close event
    conn.on('close',Disconnect)

});

// Create an http server
const server = http.createServer(app);

// Integrate SockJS and listen on /echo
echo.installHandlers(server, {prefix:'/echo'});

// Start server
server.listen(9999, '0.0.0.0');

app.get('/group', (req, res)=> {
    res.sendfile('group.html');
});

