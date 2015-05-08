if (Meteor.isClient) {
  // This code only runs on the client
  Template.globe.rendered = function() {
			var earth = new WE.map('globe-cv');
			
			WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
					subdomains: '1234',
					attribution: 'Tiles Courtesy of MapQuest'
			}).addTo(earth);
			
			earth.setView([51.505, 0], 2);
			
			var wf = new WeatherFetch("http://api.openweathermap.org/data/2.5/weather?q=", earth);
  }
}

if (Meteor.isServer) {
		Meteor.startup(function () {
				// code to run on server at startup
		});
}
