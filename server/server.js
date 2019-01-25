const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

port = process.env.PORT || 3000;
relativePath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');
  socket.on('disconnect', (socket) => {
    console.log('User Disconnected');
  });


  socket.on('createMessage', (message) => {
    console.log('Create new Message', message);
    io.emit('newMessage', {
      to: message.to,
      text: message.text
    });
  });
});

app.use(express.static(relativePath));

server.listen(port, () => {
  console.log('Server is ip on port', port);
});
