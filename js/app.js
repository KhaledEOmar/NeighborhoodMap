(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
 $('.dropdown-trigger').dropdown({closeOnClick:false});

var map; 
var theViewModel = new viewModel();

function viewModel(){
	var self = this;
	self.filter = ko.observable("");
	self.places = ko.observableArray([]);
	hoverBounce = function(){
		this.bounce();
	};
	stopHoverBounce = function(){
		this.stopBounce();
	};
	hideMarker = function(){
		this.hideMarker();
		this.visible = false;
	};
};

function initialize() {
	var raleigh = {lat: 35.780436, lng: -78.648135};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: raleigh
	});
	for(var x =0; x<locations.length; x++){
		theViewModel.places.push(new Place(locations[x]));
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
	self.visible = ko.observable(true);
	
	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.lat, self.lng),
		animation: google.maps.Animation.DROP,
		map: map,
		title: self.title
	});

	self.contentString = 'Hello';	
	
	self.infoWindow = new google.maps.InfoWindow({
		content: self.contentString
	});
	
	self.marker.addListener('click', (function(){
		for(var x = 0; x < theViewModel.places().length; x++){
			theViewModel.places()[x].marker.setAnimation(null);
			theViewModel.places()[x].infoWindow.close();
		}
		self.infoWindow.open(map,self.marker);
	}));
	
	self.bounce = function(){
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
	};
	self.stopBounce = function(){
		self.marker.setAnimation(null);
	};
	
	self.hideMarker = function(){
		self.marker.setMap(null);
	};
};

function googleError(){
	alert("Google Maps failed to load.");
};

ko.applyBindings(theViewModel);