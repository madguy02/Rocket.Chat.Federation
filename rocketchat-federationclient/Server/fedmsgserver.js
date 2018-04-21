// this is not required anymore, remains of the first experiment
var Comments = new Mongo.Collection("rocketchat_federationmessage");

  Meteor.publish("rocketchat_federationmessage", function () {
	// console.log(Comments.find({}));
      return Comments.find({});
       
  });

