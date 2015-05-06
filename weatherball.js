if (Meteor.isClient) {
  // This code only runs on the client
  Template.globe.rendered = function() {
    var earth = new WE.map('globe-cv');
    
   WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of MapQuest'
        }).addTo(earth);
        
    var marker = WE.marker([51.5, -0.09]).addTo(earth);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

    var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
    marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});

    earth.setView([51.505, 0], 6);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
