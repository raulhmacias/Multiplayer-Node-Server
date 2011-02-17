var clients = [];
var uid = 1;
var net = require('net');
var usersOnline = 0;



var server = net.createServer(function (socket) {

  var clientId = uid;
  clients[clientId] = socket;
  socket.on("connect",function(){
   uid++;
   usersOnline++;
   console.log(clients[uid]); 
   console.log('Client connected');
   console.log('Connections ' + server.connections);
   console.log(socket.remoteAddress);

   //socket.write("<state><status connection=\"Connected\"></status></state>\0");
	socket.write("<state><status>Connected</status><id>"+clientId+"</id><num_online>"+usersOnline+"</num_online></state>\0");
	for(var i in clients){
		if(i != clientId){
		   clients[i].write("<state><new_player>"+clientId+"</new_player></state>\0");
		}
		
	}
});

  socket.on("data", function (data) {
  	console.log(data.toString());
    for(var i in clients){
		if(i != clientId){
		  clients[i].write(data.toString());
		}
		
	}});

  socket.on("end",function(){
         console.log("Client :" + clientId +" connection was closed")
         usersOnline--;
         delete clients[clientId];
         for(var i in clients){
			if(i != clientId){
			  clients[i].write("<state><player_left>"+clientId+"</player_left></state>\0");
		}
		
	}
 });
	
});

server.listen(8124);

