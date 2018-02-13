var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist/'));
var settings = {
    server_port: 3000
};

app.get('/**', function (request, response) {
    response.sendFile(__dirname + '/dist/index.html');
});

/**
 * Start server
 */
app.listen(settings.server_port, function () {
    console.log('Listening on port  ' + settings.server_port + '.');
});