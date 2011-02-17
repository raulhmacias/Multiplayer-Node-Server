var net = require('net');
var fs  = require('fs');
var clients = [];
var uid = 0;
var policy;


fs.readFile('./flashpolicy.xml', function (err, data) {
  if (err) throw err;
  policy = data.toString();
});

var server = net.createServer(function (socket) {


   socket.on("connect",function(){
   console.log('Policy Client Connected');
   console.log(socket.remoteAddress);

});

  socket.on("data", function (data) {

    socket.write(policy);
    socket.write('\0');
    console.log(policy);
 });

  socket.on("end",function(){
         console.log("connection was closed")

 });
	
});

server.listen(843);

