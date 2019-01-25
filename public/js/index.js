var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  console.log('New Message Recieved: ', message);
  var li = jQuery('<li></li>');
  li.text(`User: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: `);

  var a = jQuery('<a target="_blank">My Current Location</a>');
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val()
  }, function () {
    messageBox.val('');
  });
});

var loc = jQuery('#send-location');
loc.on('click', function () {
  if(!navigator.geolocation) {
    return alert('This feature is not supported by your browser');
  }
  loc.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    loc.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      from: 'Admin',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    loc.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
});
