'use strict'

const Service = require('trails/service')
const sockjs = require('sockjs');
const RoomServer = require('sockjs-rooms').server;

/**
 * @module SockjsService
 * @description TODO document Service
 */
module.exports = class SockjsService extends Service {

    constructor(app){
        super(app)
        const sockjs_opts = {
            sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"
        };
        this.service = sockjs.createServer(sockjs_opts);
        this.server = new RoomServer(this.service);
    }

    socketInit(http){

        let friends = this.server.registerChannel('friends');
        friends.on('connection', (conn) =>  {
            conn.write('friends is connected');
            conn.on('data', (data) => {
                conn.write(data);
            });
        });

        let Family = this.server.registerChannel('Family');
        Family.on('connection', (conn) => {
            conn.write('Family is connected');
            conn.on('data', (data) => {
                conn.write(data);
            });
        });

        let colleague = this.server.registerChannel('colleague');
        colleague.on('connection', (conn) => {
            conn.write('coulegue is connected');
            conn.on('data', (data) => {
                conn.write(data);
                console.log(`sdadsfs`,data)
            });
        });

        let red = this.server.registerChannel('red');
        red.on('connection', (conn) => {
            conn.write('Red is connected');
            conn.on('data', function(data) {
                conn.write(data);
            });
        });

        let latency = this.server.registerChannel('latency');
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

        this.service.installHandlers(http, {
            prefix: '/multiplex'
        });

    }
}

