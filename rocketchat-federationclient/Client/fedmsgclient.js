// this is not required in the second experiment, where the nodes are now connected in p2p.
var Comments = new Mongo.Collection("rocketchat_federationmessage");

  Meteor.subscribe("rocketchat_federationmessage");


  Template.federation.helpers({
    federationmessage: function () {
	// console.log(Comments.find({}).fetch());
      return Comments.find({}).fetch();
  }
      
    
  });

  



