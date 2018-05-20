(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


var viewModel = function(){

};

var model = function(){

};


function googleMap() {
	var marker, x;
	var raleigh = {lat: 35.780436, lng: -78.648135};
	
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: raleigh
	});
	
	for (x = 0; x < locations.length; x++){
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[x].lat, locations[x].lng),
			map: map,
			title: locations[x].name
		});
	}
};