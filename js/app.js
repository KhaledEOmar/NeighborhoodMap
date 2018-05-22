(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
 $('.dropdown-trigger').dropdown();

var map; 
var places = ko.observableArray([]);

var viewModel = function(){
	var self = this;
	var list = ko.observableArray([])
	
	
};

function initialize() {
	var raleigh = {lat: 35.780436, lng: -78.648135};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: raleigh
	});
	for(var x =0; x<locations.length; x++){
		places.push(new Place(locations[x]));
	}
};

var Place = function(locationInfo){
	var self = this;
	self.visible = true;
	self.bounce = false;
	self.lat = locationInfo.lat;
	self.id = locationInfo.id;
	self.lng = locationInfo.lng;
	self.title = locationInfo.name;
	self.contentString = 'Hello';
	
	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.lat, self.lng),
		animation: google.maps.Animation.DROP,
		map: map,
		title: self.title
	});
	
	self.infoWindow = new google.maps.InfoWindow({
		content: self.contentString
	});
	
	self.marker.addListener('click', (function(){
		toggleBounce(self.id);
		self.infoWindow.open(map,self.marker);
    }));

};

function toggleBounce(id){
	for(var x = 0; x < places().length; x++){
		places()[x].marker.setAnimation(null);
	}
	if (places()[id].marker.getAnimation() !== null) {
		places()[id].marker.setAnimation(null);
	} else {
		places()[id].marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

function googleError(){
	alert("Google Maps failed to load.");
};

ko.applyBindings(new viewModel());