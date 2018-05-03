var http = require('http');
var sockjs = require('sockjs');
const  express = require('express'),
    app = express();

// Clients list
const clients = {};

// Broadcast to all clients
const  broadcast = (message) => {
    // iterate through each client in clients object
    for (let client in clients){
        // send the message to that client
        clients[client].write(JSON.stringify(message));
    }
}

// create sockjs server
const echo = sockjs.createServer();

// on new connection event
echo.on('connection', (conn) => {

console.log(conn.id)
    const Disconnect = ()=> {
        delete clients[conn.id];
    }

    // add this client to clients object
    clients[conn.id] = conn;
    const newMessage = (mes) => {
        console.log(mes);
        broadcast(JSON.parse(mes));
    }

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

// Route for chat
app.get('/chat', (req, res)=> {
    res.sendFile('chat.html', {root: './public'});
});