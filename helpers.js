exports.moment = require('moment');

exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.googleMapsClient = require('@google/maps').createClient({
	key: process.env.MAP_KEY
})

exports.autoComplete = function (input, latInput, lngInput) {
	if (!input) return; // skip it if there is no input
	var dropdown = new google.maps.places.Autocomplete(input);
	dropdown.addListener('place_changed', function () {
		var place = dropdown.getPlace();
		latInput.value = place.geometry.location.lat();
		lngInput.value = place.geometry.location.lng();
	});
	//  if someone hits enter on address field, don't submit form
	input.on('keydown', function (e) {
		if (e.keyCode === 13) e.preventDefault();
	});
}