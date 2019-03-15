// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let userCount = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');

  userCount = userCount + 1;

  wss.clients.forEach(function each(client) {
    client.send(
      JSON.stringify({
        type: 'incomingUser',
        connections: wss.clients.size
      })
    );
  });



wss.broadcast = message => {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      console.log(message)
      client.send(JSON.stringify(message));
    }
  });
};

//from client
  ws.on("message", function incoming(message) {
    let newMessageAdded = JSON.parse(message);

      wss.broadcast(newMessageAdded)
 });

  ws.on('close', () => {
    console.log('Client disconnected')

    userCount = userCount - 1;

    wss.clients.forEach(function each(client) {
    client.send(
      JSON.stringify({
        type: 'incomingUser',
        connections: wss.clients.size
      })
      );
    });
  });
})