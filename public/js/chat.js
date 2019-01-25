var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var messageHeight = newMessage.innerHeight();
  var prevMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + messageHeight + prevMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
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
