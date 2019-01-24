var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (email) {
  console.log('New Email Recieved: ', email);
});

socket.emit('createMessage', {
  to: 'sanjayb.shanbhag@gmail.com',
  text: 'Hello There'
});
