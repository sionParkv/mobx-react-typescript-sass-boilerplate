var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
var settings = {
    server_port: 3000
};

app.get('/**', function (request, response) {
    response.sendFile('/index.html');
});

/**
 * Start server
 */
app.listen(settings.server_port, function () {
    console.log('Listening on port  ' + settings.server_port + '.');
});