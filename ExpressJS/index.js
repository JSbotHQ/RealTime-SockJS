const http = require('http');
const express = require('express');
const sockjs = require('sockjs');
const RoomServer = require('sockjs-rooms').server;

const sockjs_opts = {
    sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"
};
const service = sockjs.createServer(sockjs_opts);
const server = new RoomServer(service);

let red = server.registerChannel('red');
red.on('connection', (conn) =>  {
    conn.write('Red is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let bob = server.registerChannel('bob');
bob.on('connection', (conn) => {
    conn.write('bob is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let carl = server.registerChannel('carl');
carl.on('connection', (conn) => {
    conn.write('carl is connected');
    conn.on('data', (data) => {
        conn.write(data);
        console.log(`sdadsfs`,data)
    });
});

let red = server.registerChannel('red');
red.on('connection', (conn) => {
    conn.write('Red is connected');
    conn.on('data', function(data) {
        conn.write(data);
    });
});

let latency = server.registerChannel('latency');
latency.on('connection', (conn) => {
    conn.on('data', (data) => {
        conn.write(data);
    });
});

red.on('close',() => {
    console.log("SERVER: red channel was closed!");
});
red.on('end', () => {
    console.log("SERVER: red channel was end!");
});

let app = express();
let server = http.createServer(app);+-

service.installHandlers(server, {
    prefix: '/multiplex'
});

console.log(' [*] Listening on 0.0.0.0:9999');
server.listen(9999, '0.0.0.0');
app.get('/', (req, res) => {
    res.sendfile(__dirname + '/public/group.html');
});