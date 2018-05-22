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
	this.list = ko.observableArray([]);

};


var Place = function(locationInfo){
	var self = this;
	self.visible = true;
	self.lat = locationInfo.lat;
	self.lng = locationInfo.lng;
	self.title = locationInfo.name;
	self.contentString = "Hello";
	
	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.lat, self.lng),
		animation: google.maps.Animation.DROP,
		map: map,
		title: self.title
	});
	
	self.marker.addListener('click', function(){
        toggleBounce(self);
    });
	
	self.infoWindow = new google.maps.InfoWindow({
		content: self.contentString
	});
	
	self.hideMarker = function(){
		if(self.visible){
			self.marker.setVisible(false);
		}
	};
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

function toggleBounce(place) {
    if (place.marker.getAnimation() !== null) {
        place.marker.setAnimation(null);
    } else {
        place.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function googleError(){
	alert("Google Maps failed to load.");
};

ko.applyBindings(new viewModel());