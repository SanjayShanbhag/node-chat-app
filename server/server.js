const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {messageGenerator} = require('./utils/messages.js');

port = process.env.PORT || 3000;
relativePath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {

  socket.emit('newMessage', messageGenerator('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', messageGenerator('Admin', 'New User Joined'));

  console.log('New User Connected');
  socket.on('disconnect', (socket) => {
    console.log('User Disconnected');
  });


  socket.on('createMessage', (message, callback) => {
    console.log('Create new Message', message);
    io.emit('newMessage', messageGenerator(message.from, message.text));
    callback();
  });
});

app.use(express.static(relativePath));

server.listen(port, () => {
  console.log('Server is ip on port', port);
});
