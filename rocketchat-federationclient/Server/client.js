// please don't remove commented code (as of now), they are yet to be planned

var net = require('net');
var fs = require('fs');
var http = require('http');
var Skiff = require('skiff');
var topology = require('fully-connected-topology');
var networkAddress = require('network-address');
var varint = require('varint');
var lpmessage = require('length-prefixed-message');
var jsonStream = require('duplex-json-stream');
var streamSet = require('stream-set');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:8182";
var stdin = process.openStdin();
var circularJson = require("circular-json");
var MongoOplog = require('mongo-oplog');
var me = 'localhost:3003';
var peers = 'localhost:6000';
var swarm = topology(me,peers);
var streams = streamSet();
const oplog = MongoOplog('mongodb://127.0.0.1:8182/local', { ns: 'meteor.rocketchat_message' })

oplog.tail();

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
// socket.write("handshake");
//   socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
// var val = data.toString('utf8').replace("PUT /channel/general HTTP/1.1","").replace("Content-Type: application/json","")
// .replace(/^[0-9]*$/gm,"").replace("Transfer-Encoding: chunked","").replace("Host: localhost:6001","").replace("Connection: close","").replace("2e","").replace(" ","");

	//var doc = JSON.parse(val);
	// MongoClient.connect(url, function(err,db){
	// console.log("HELP");
	// var dbo = db.db("local");
	// var change_streams = dbo.collection("rocketchat_message").watch();
	// 	//if (err) throw Error;
	// 	//else {
	// 		//console.log(result);
	// 		change_streams.on('change', function(change){
	// 			console.log("QWERTY");
	// 			console.log(JSON.stringify("ADERT"+change));
	// 			Federation();
	// 		  });
		//}
		//db.close();
	
	//});

 // This is yet to be planned
	
//});
    //var content = fs.writeFileSync('/home/madguy02/Desktop/rclog.txt', doc.msg);

 // } ) )
} ) ).listen(5001);

var client = new net.Socket();
client.connect(5001, '127.0.0.1', function() {
console.log('connected this one');



swarm.on('connection', function(socket) {
  console.log(peers+'[a peer joined]');
  socket = jsonStream(socket);
  streams.add(socket);
  streams.forEach(function(socket) {
	
socket.write({"username": "testUser012","name": "testUser012", "pass": "blahblah"});
			})
		
  //socket.on('data',function(data){
	//function Federation() {
	
	oplog.on('insert', function(doc){
	console.log(doc);
		
	var params = {
	host: 'localhost',
	port: 3000,
	path: '/api/v1/users.register',
	method: 'POST'

};
var jsondata;
var parsedjsondata;
var userId;
var token;
var email;
var req = http.request(params, function(res) {
  res.on('data', function (chunk) {
	 jsondata = chunk.toString('utf8');
	 console.log(jsondata);
     parsedjsondata = (JSON.parse(jsondata));
     console.log(parsedjsondata);
     userId = parsedjsondata.user._id;
    console.log(userId);
	 token = parsedjsondata.user.services.email.verificationTokens[0].token;
	 email = parsedjsondata.user.services.email.verificationTokens[1].address;
    console.log(token);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(JSON.stringify({"username": doc.o.u.username, "email": doc.o.u.username+"@gmail.com", "pass": "password", "name": doc.o.u.username}));
req.end();


var login = {
host: 'localhost',
	port: 3000,
	path: '/api/v1/login',
	method: 'POST'
};

var jsondata1;
var parsedjsondata1;
var userId1;
var token1;
setTimeout(function() {
var loginreq = http.request(login, function(res) {
  res.on('data', function (chunk) {
   jsondata1 = chunk.toString('utf8');
  parsedjsondata1 = (JSON.parse(jsondata1));
  console.log(parsedjsondata1);
  userId1 = parsedjsondata1.data.userId;
 console.log(userId1);
  token1 = parsedjsondata1.data.authToken;
 console.log(token1);
  });
});

loginreq.write(JSON.stringify({ "username": doc.o.u.username, "password": "password" }));
loginreq.end();
}, 6000);

// var msgId; //not sure about globalizing this
// var msg; // same here

// MongoClient.connect(url, function(err,db){
// 	if(err) throw err;
// 	var dbo = db.db("meteor");
// 				dbo.collection("rocketchat_message").find().sort({$natural: -1}).limit(3).toArray(function(err, result){
// 					if (err) throw Error;
// 					else {
// 						//console.log(result);
						
// 						var DbParsedData = JSON.parse(JSON.stringify(result));
// 						 //msgId = DbParsedData[0]._id;
// 							msg = DbParsedData[0].msg;
// 							console.log("FFFFFFFF"+msg);
						
// 					}
				
// 			  //});
	
// 		//db.close();
// 	});
// 	});

setTimeout(function(){
var newheaders = {
  "X-Auth-Token": ""+token1,
  "X-User-Id": ""+userId1,
  "Content-type":"application/json"
}
console.log(newheaders);



var sendMessage = {
  host: 'localhost',
  port: 3000,
  path: '/api/v1/chat.postMessage',
  method: 'POST',
  headers: newheaders
}



var sendMessagereq = http.request(sendMessage, function(res){
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY-this: ' + chunk);
  });
});


console.log("A MESSAGE"+doc.o.msg);
//});
 // this is work in progess...
 sendMessagereq.write(JSON.stringify({"channel": "#general", "text": doc.o.msg}));
sendMessagereq.end();
}, 9000);

    //console.log(data.username + '>' + data.message);
  //})

//})
//}
});

// })


});

});


	//MONGO_OPLOG_URL=mongodb://oplogger:password@localhost:27017/local?authSource=admin

	
