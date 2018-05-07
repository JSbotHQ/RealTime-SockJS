# RealTime-SockJS


#1. ExpressJS
  - `cd ExpressJS`
  - start the server by `npm start`.

  i. client to all connected client messaging
   - go to `http://localhost:3000/chat`.

   client code logic:

        sendMessage=() => {
             let message = $('#m').val();
             sock.send(JSON.stringify(message));
             $('#m').val('');
             return false;
        }

        sock.onmessage = (msg) => {
             console.log(msg)
             let content = JSON.parse(msg.data);
             $('#messages').append($('<li>').text(content));
        };

  server code logic:

        const newMessage = (mes) => {
                console.log(mes);
                broadcast(JSON.parse(mes))
        }
        conn.on('data', newMessage)

  ii. room messaging
   - go to `http://localhost:3000/group`

   client code logic:

        form.submit( () => {
            print('[ ] sending', inp.val());
            ws.send(inp.val());
            inp.val('');
            return false;
        });

        let print = (m, p) => {
             p = (p === undefined) ? '' : JSON.stringify(p);
             div.append($("<code>").text(m + ' ' + p));
             div.append($("<br>"));
             div.scrollTop(div.scrollTop() + 10000);
        };
        ws.onopen    = () => {print('[*] open', ws.protocol);};
        ws.onmessage = (e) => {print('[.] message', e.data);};
        ws.onclose   = () => {print('[*] close');};

   server code logic:

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

#2. TrailsJS

   i. client to all connected client messaging
    - go to `http://localhost:3000/chat`.

    client code logic:

          sendMessage=() => {
               let message = $('#m').val();
               sock.send(JSON.stringify(message));
               $('#m').val('');
               return false;
          }

          sock.onmessage = (msg) => {
               console.log(msg)
               let content = JSON.parse(msg.data);
               $('#messages').append($('<li>').text(content));
          };

    server code logic:

          const newMessage = (mes) => {
                  console.log(mes);
                  broadcast(JSON.parse(mes))
          }
          conn.on('data', newMessage)

   ii. room messaging
    - go to `http://localhost:3000/group`

    client code logic:

          form.submit( () => {
              print('[ ] sending', inp.val());
              ws.send(inp.val());
              inp.val('');
              return false;
          });

          let print = (m, p) => {
               p = (p === undefined) ? '' : JSON.stringify(p);
               div.append($("<code>").text(m + ' ' + p));
               div.append($("<br>"));
               div.scrollTop(div.scrollTop() + 10000);
          };
          ws.onopen    = () => {print('[*] open', ws.protocol);};
          ws.onmessage = (e) => {print('[.] message', e.data);};
          ws.onclose   = () => {print('[*] close');};

    server code logic:

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

#3. HapiJS
  - `cd HapiJS`
  - start the server by `npm start`.

  i. client to all connected client messaging
     - go to `http://localhost:3000/chat`.

     client code logic:

          sendMessage=() => {
               let message = $('#m').val();
               sock.send(JSON.stringify(message));
               $('#m').val('');
               return false;
          }

          sock.onmessage = (msg) => {
               console.log(msg)
               let content = JSON.parse(msg.data);
               $('#messages').append($('<li>').text(content));
          };

    server code logic:

          const newMessage = (mes) => {
                  console.log(mes);
                  broadcast(JSON.parse(mes))
          }
          conn.on('data', newMessage)

  ii. room messaging
   - go to `http://localhost:3000/group`

    client code logic:

          form.submit( () => {
              print('[ ] sending', inp.val());
              ws.send(inp.val());
              inp.val('');
              return false;
          });

          let print = (m, p) => {
               p = (p === undefined) ? '' : JSON.stringify(p);
               div.append($("<code>").text(m + ' ' + p));
               div.append($("<br>"));
               div.scrollTop(div.scrollTop() + 10000);
          };
          ws.onopen    = () => {print('[*] open', ws.protocol);};
          ws.onmessage = (e) => {print('[.] message', e.data);};
          ws.onclose   = () => {print('[*] close');};

    server code logic:

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
