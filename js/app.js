var viewModel = function(){

};

var model = function(){

};


function googleMap() {
	var testLocation = {lat: 35.777080, lng: -78.638036};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: testLocation
	});
	var marker = new google.maps.Marker({
		position: testLocation,
		map: map
	});
};