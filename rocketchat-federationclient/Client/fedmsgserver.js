// this is also not required anymore, as the nodes are connected in p2p now.
// these are files from the prev experiment (a naive one)
var Comments = new Mongo.Collection("rocketchat_federationmessage");

  Meteor.publish("rocketchat_federationmessage", function () {
	// console.log(Comments.find({}));
      return Comments.find({});
       
  });

