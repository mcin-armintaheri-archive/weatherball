if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    cities: [
      { name: "This is city 1" },
      { name: "This is city 2" },
      { name: "This is city 3" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
