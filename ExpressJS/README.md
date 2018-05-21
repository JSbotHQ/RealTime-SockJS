# RealTime-SockJS

### 1. ExpressJS

  #### i. client to all connected client messaging
   - go to `http://localhost:4001/chat`.

   ##### client code logic:

        sock.send(JSON.stringify(message));

        sock.onmessage = (msg) => {
             console.log(SON.parse(msg))
        };

  ##### server code logic:

        conn.on('data', (msg) => {
            console.log(JSON.parse(msg));
        })

  #### ii. room messaging
   - go to `http://localhost:4001/group`

   ##### client code logic:

        print('[ ] sending', inp.val());
        ws.send(inp.val());
        inp.val('');

        let print = (m, p) => {
             p = (p === undefined) ? '' : JSON.stringify(p);
             div.append($("<code>").text(m + ' ' + p));
             div.append($("<br>"));
             div.scrollTop(div.scrollTop() + 10000);
        };
        ws.onopen    = () => {print('[*] open', ws.protocol);};
        ws.onmessage = (e) => {print('[.] message', e.data);};
        ws.onclose   = () => {print('[*] close');};

   ##### server code logic:

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