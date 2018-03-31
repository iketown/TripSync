const tripView = (function(){

	let map;
	let bounds = new google.maps.LatLngBounds
	function makeArrowAndExtendBounds(leg){
		const start = new google.maps.LatLng(leg.startLoc.lat, leg.startLoc.lng)
		const end = new google.maps.LatLng(leg.endLoc.lat, leg.endLoc.lng)
		leg.line = new google.maps.Polyline({
			path: [start, end],
			strokeWeight: 1,
			geodesic: true,
			icons: [{
				icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2},
				offset: '100%'
            }] 
		})
		leg.line.setMap(map)
		// leg.startWindow = new google.maps.InfoWindow({content: leg.startLoc.city, position: start}).open(map)
		// leg.endWindow = new google.maps.InfoWindow({content: leg.endLoc.city, position: end}).open(map)
		bounds.extend(start)
		bounds.extend(end)
	}
	function initMap(){

		let startLat = store.trips.current.tripLegs[0].startLoc.lat 
		let startLng = store.trips.current.tripLegs[0].startLoc.lng 
		let endLat = store.trips.current.tripLegs[0].endLoc.lat 
		let endLng = store.trips.current.tripLegs[0].endLoc.lng 
		const start = new google.maps.LatLng(startLat, startLng)
		const end = new google.maps.LatLng(endLat, endLng)
		map = new google.maps.Map(document.getElementById('googleTripMap'), {
			zoom: 8,
			// center,
			styles: store.mapStyle,
			disableDefaultUI: true
		})
	 	bounds.extend(start)
	 	bounds.extend(end)
	 	const center = bounds.getCenter()
		
		store.trips.current.tripLegs.forEach(leg=> makeArrowAndExtendBounds(leg))
		map.setCenter( bounds.getCenter() )
		map.fitBounds( bounds, {top: 5, bottom: 5, left: 5, right: 5} )
	}







	render = ()=>{
		const trip = store.trips.current
		html = `
			<h2>${trip.name.toUpperCase()}</h2>
			<div id="googleTripMap"></div>
		`
		$('.rightSide').html(html)
		initMap()
	}
	
	return {
		render,
		// map,
	}

})()








