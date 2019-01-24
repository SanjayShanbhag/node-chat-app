const express = require('express');
const path = require('path');

port = process.env.PORT || 3000;
relativePath = path.join(__dirname, '../public');

var app = express();

app.use(express.static(relativePath));

app.listen(port, () => {
  console.log('Server is ip on port', port);
});
