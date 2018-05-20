var locations = [
	{
		name:"Beasley's Chicken + Honey",
		lat: 35.77705,
		lng: -78.638033
	},
	{
		name:"The Pit Authentic Barbecue",
		lat: 35.7760373,
		lng: -78.6469037		
	},
	{
		name:"Bida Manda Laotian Restaurant and Bar",
		lat: 35.7772935,
		lng: -78.6389317		
	},
	{
		name:"Glenwood Grill",
		lat: 35.8149658,
		lng: -78.663287		
	},
	{
		name:"The Cowfish Sushi Burger Bar",
		lat: 35.8372657,
		lng: -78.6423387		
	}
];

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