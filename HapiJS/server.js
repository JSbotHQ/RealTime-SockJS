// Hapi
const Hapi = require('hapi');

// Create a server with a host and port

const server = Hapi.server({
    host: 'localhost',
    port: 3000
});

const start = async () => {

    try {
        await server.register(require('inert'));

        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};
start();

const sockjs = require('sockjs');
const RoomServer = require('sockjs-rooms').server;
const sockjs_opts = {
    sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"
};
const service = sockjs.createServer(sockjs_opts);
const serve = new RoomServer(service);

let friends = serve.registerChannel('friends');
friends.on('connection', (conn) =>  {
    conn.write('friends is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let Family = serve.registerChannel('Family');
Family.on('connection', (conn) => {
    conn.write('Family is connected');
    conn.on('data', (data) => {
        conn.write(data);
    });
});

let colleague = serve.registerChannel('colleague');
colleague.on('connection', (conn) => {
    conn.write('coulegue is connected');
    conn.on('data', (data) => {
        conn.write(data);

    });
});

let red = serve.registerChannel('red');
red.on('connection', (conn) => {
    conn.write('Red is connected');
    conn.on('data', function(data) {
        conn.write(data);
    });
});

let latency = serve.registerChannel('latency');
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

let online = []
// on new connection event
echo.on('connection', (conn) => {

    online.push(conn.id)

    // add this client to clients object
    clients[conn.id] = conn;
    //conn.write(online)
    const newMessage = (mes) => {
        console.log(mes);
        broadcast(JSON.parse(mes))
    }

    const Disconnect = ()=> {
        // let index = online.indexOf(conn.id);
        // if (index > -1) {
        //     online.splice(index, 1);
        // }
        // console.log(`disconnected`,conn.id)
        delete clients[conn.id];
    }

    // on receive new data from client event
    conn.on('data', newMessage)

    // on connection close event
    conn.on('close',Disconnect)

});

service.installHandlers(server.listener, {
        prefix: '/multiplex'
    });
// Integrate SockJS and listen on /echo
echo.installHandlers(server.listener, {prefix:'/echo'});
// ROUTES
server.route({
    method: 'GET',
    path: '/chat',
    handler: (request, h) => h.file('./public/chat.html')
});
server.route({
    method: 'GET',
    path: '/group',
    handler: (request, h) => h.file('./public/group.html')
});



