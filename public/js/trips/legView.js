const legView = (function(){

	let map;
	 function initMap(){
		let startLat = store.trips.currentLeg.startLoc.lat 
		let startLng = store.trips.currentLeg.startLoc.lng 
		let endLat = store.trips.currentLeg.endLoc.lat 
		let endLng = store.trips.currentLeg.endLoc.lng 
		const start = new google.maps.LatLng(startLat, startLng)
		const end = new google.maps.LatLng(endLat, endLng)
	 	const bounds = new google.maps.LatLngBounds
	 	bounds.extend(start)
	 	bounds.extend(end)
	 	map = new google.maps.Map(document.getElementById('googleLegMap'), {
	 		center: start,
	 		zoom: 8,
	 		styles: store.mapStyle
		 	})
		const tripLine = new google.maps.Polyline({
			path: [start, end],
			strokeWeight: 1,
			geodesic: true,
			icons: [{
                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2},
                offset: '100%'
            }] 
		}).setMap(map)
	 	const startMarker = new google.maps.Marker({
	 		position: start,
	 		map: map
	 	})
	 	const endMarker = new google.maps.Marker({
	 		position: end,
	 		map: map
	 	})
	 	map.fitBounds(bounds)
	 }

	 const render = ()=>{
	 	let leg = store.trips.currentLeg
	 	let html = `
		<h2>${leg.startLoc.city || leg.startLoc.cityLong || leg.startLoc.state} <i class="fas fa-arrow-right"></i> 
		${leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state}</h2>
		<div id="googleLegMap"></div>
	 	`
	 	$('.rightSide').html(html)
	 	initMap()
	 }





	return {
		map,
		render,
	}
})()