let map, street;
function init() {
	/* common settings */
	const latlng = new google.maps.LatLng(35.671381, 139.766984);
	$("#map-latlngstr").text(latlng);
	/* Normal map */
	map = new google.maps.Map($("#map-canvas")[0], {
		zoom: 14,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	/* Street view */
	street = new google.maps.StreetViewPanorama($("#map-street")[0], {
		position: latlng,
		pov: {
			heading: 34,
			pitch: 10
		}
	});
	map.setStreetView(street);
}
function setplace(place) {
	const gcode = new google.maps.Geocoder();
	gcode.geocode({address: place}, function(ret, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			const latlng = ret[0].geometry.location;
			map.setCenter(latlng);
			street.setPosition(latlng);
			map.setStreetView(street);
			$("#map-latlngstr").text(latlng);
		}
		else {
			alert("えらーがはっせい");
		}
	});
}
$(document).on("ready", function() {
	init();
	$("#simuload").on("click", function(e) {
		e.preventDefault();
		const latlng = $("#simuplace").val();
		setplace(latlng);
	});
});
