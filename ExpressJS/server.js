const http = require('http');
const express = require('express');
const sockjs = require('sockjs');
const RoomServer = require('sockjs-rooms').server;

const sockjs_opts = {
    sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"
};
const service = sockjs.createServer(sockjs_opts);
const server = new RoomServer(service);

/**
 * perticuler channel defined
 */
let friends = server.registerChannel('friends');
friends.on('connection', (conn) =>  {
    conn.write('friends is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let Family = server.registerChannel('Family');
Family.on('connection', (conn) => {
    conn.write('Family is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let colleague = server.registerChannel('colleague');
colleague.on('connection', (conn) => {
    conn.write('coulegue is connected');
    conn.on('data', (data) => {
        conn.write(data);
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

/**
 * close channel
 */
red.on('close',() => {
    console.log("SERVER: red channel was closed!");
});

/**
 * channel end
 */
red.on('end', () => {
    console.log("SERVER: red channel was end!");
});

let app = express();
let serv = http.createServer(app);

service.installHandlers(serv, {
    prefix: '/multiplex'
});

console.log('[*] Listening on 0.0.0.0:9999');
serv.listen(9999, '0.0.0.0');

// Route for group chat
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});

