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

  socket.emit('newMessage', {
    from: 'sanjayb.shanbhag@gmail.com',
    text: 'Hello',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('Create new Message', message);
  });
});

app.use(express.static(relativePath));

server.listen(port, () => {
  console.log('Server is ip on port', port);
});
