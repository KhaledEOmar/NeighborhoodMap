(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

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
	var mapStyles = [
	  {
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#1d2c4d"
		  }
		]
	  },
	  {
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#8ec3b9"
		  }
		]
	  },
	  {
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#1a3646"
		  }
		]
	  },
	  {
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.country",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#4b6878"
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#64779e"
		  }
		]
	  },
	  {
		"featureType": "administrative.neighborhood",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.province",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#4b6878"
		  }
		]
	  },
	  {
		"featureType": "landscape.man_made",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#334e87"
		  }
		]
	  },
	  {
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#023e58"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#283d6a"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#6f9ba5"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#1d2c4d"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#023e58"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#3C7680"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#304a7d"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#98a5be"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#1d2c4d"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#2c6675"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#255763"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#b0d5ce"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#023e58"
		  }
		]
	  },
	  {
		"featureType": "transit",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "transit",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#98a5be"
		  }
		]
	  },
	  {
		"featureType": "transit",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#1d2c4d"
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#283d6a"
		  }
		]
	  },
	  {
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#3a4762"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#0e1626"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#4e6d70"
		  }
		]
	  }
	]
	var raleigh = {lat: 35.780436, lng: -78.648135};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		styles: mapStyles,
		center: raleigh
	});
	
	// Create the DIV to hold the control and call the CenterControl()
	// constructor passing in this DIV.
	var centerControlDiv = document.createElement('div');
	centerControlDiv.className = 'sidenav-trigger';
	centerControlDiv.dataset.target = "slide-out";
	var centerControl = new CenterControl(centerControlDiv, map);

	centerControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);	
	
	for(var x =0; x<locations.length; x++){
		theViewModel.places.push(new Place(locations[x]));
	}
};

//Code from google maps API for creating button on map
function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'View List';
        controlUI.appendChild(controlText);
}

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
		self.bounce();
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