var net = require("net");
var fs = require("fs");
var http = require("http");
var Skiff = require("skiff");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:8182/meteor";
var topology = require("fully-connected-topology");
var networkAddress = require("network-address");
var lpmessage = require("length-prefixed-message");
var varint = require("varint");
// var t1 = topology("127.0.0.1:4001", ["127.0.0.1:4002", "127.0.0.1:4003"]);
// t1.on("connection", function(connection, peer) {
  //console.log("t1 is connected to", peer);
// });
// implementing raft via skiff lib.
// const options = {
//   db: require('memdown'), // in memory database
//   peers: [ // peer addresses
//     '/ip4/127.0.0.1/tcp/3000'
//
//   ]
// }
// const skiff = Skiff('/ip4/127.0.0.1/tcp/3004', options)
//
// const db = skiff.levelup()
//
// skiff.start(err => {
//   if (err) {
//     console.error('Error starting skiff node: ', err.message)
//   } else {
//     console.log('Skiff node started')
//
//     db.put('key', 'value', (err) => {
//
//     })
//   }
// })
//
// skiff.join('/ip4/127.0.0.1/tcp/3000',function(err){
//   if (err) {
//     console.error('error in joining');
//   }
//   console.log('peer invited');
// })
//
// console.log(skiff.term());
// console.log(skiff.stats());
// skiff.createNetwork(active(innactivityTimeout));

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
  socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
	var val = data.toString("utf8").replace("PUT /channel/general HTTP/1.1","").replace("Content-Type: application/json","")
			.replace(/^[0-9]*$/gm,"").replace("Transfer-Encoding: chunked","").replace("Host: localhost:5001","").replace("Connection: close","").replace("Host:localhost:01","").replace("1f","")
			.replace(" ","");
	//var doc = JSON.parse(val);
	//console.log(val);
	//socket.pipe(data);
	var writerStream = fs.createWriteStream("/home/madguy02/Desktop/rclog.txt");
	writerStream.write(val,"UTF8");
	//var content = fs.appendFileSync('', val);
	// insertion into mongodb is not required anymore and is bad programming
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("meteor");
  	var myobj = JSON.parse(val);
	//console.log(myobj);
    dbo.collection("rocketchat_federationmessage").insert(myobj, function(err, res) {
    	if (err) throw err;
    	//console.log("1 document inserted");
      db.close();
  });
});

//});
    //var content = fs.writeFileSync('/home/madguy02/Desktop/rclog.txt', doc.msg);

  } ) );
} ) ).listen(5001);
