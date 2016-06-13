var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pkginfo = require('pkginfo')(module);

var serverPort = process.env.PORT || 3009;

// respond on a status endpoint to verify that the server is up and running
app.get('/status', function( req, res ) {
  return res.status(200).json({
    app: module.exports.name,
    version: module.exports.version,
    status: 200,
    message: 'OK - ' + Math.random().toString(36).substr(3, 8)
  });
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(serverPort, function() {
  console.log("Server correctly started.");
  console.log("Server is listening on port " + serverPort);
});
