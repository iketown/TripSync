const tripView = (function(){



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
		// bounds.extend(start)
		// bounds.extend(end)
	}
	
	let bounds;
	function initMap(){
		if (store.trips.current.tripLegs.length) {
			const getSwNe = ()=>{
				const lats = []
				const lngs = []
				store.trips.forEach(trip=>{
					trip.tripLegs.forEach(leg=>{
						lats.push(leg.startLoc.lat)
						lngs.push(leg.endLoc.lng)
						lats.push(leg.startLoc.lat)
						lngs.push(leg.endLoc.lng)
					})
				})
				const sw = {lat: Math.min(...lats) ,lng: Math.min(...lngs)}
				const ne = {lat: Math.max(...lats), lng: Math.max(...lngs)}
				return {sw,ne}
			}
			const swne = getSwNe()
			bounds = new google.maps.LatLngBounds( swne.sw, swne.ne );
			
			// let startLat = store.trips.current.tripLegs[0].startLoc.lat 
			// let startLng = store.trips.current.tripLegs[0].startLoc.lng 
			// let endLat = store.trips.current.tripLegs[0].endLoc.lat 
			// let endLng = store.trips.current.tripLegs[0].endLoc.lng 
			// const start = new google.maps.LatLng(startLat, startLng)
			// const end = new google.maps.LatLng(endLat, endLng)
			map = new google.maps.Map(document.getElementById('googleTripMap'), {
				zoom: 8,
				// center: start,
				styles: store.mapStyle,
				disableDefaultUI: true
			})
		 	// bounds.extend(start)
		 	// bounds.extend(end)
		 	// const center = bounds.getCenter()
			
			store.trips.current.tripLegs.forEach(leg=> makeArrowAndExtendBounds(leg))
			map.setCenter( bounds.getCenter() )
			map.fitBounds( bounds, {top: 5, bottom: 10, left: 5, right: 5} )
		}
	}







	render = ()=>{
		const trip = store.trips.current
		html = `
			<h2>${trip.name.toUpperCase()}</h2>
			<div id="googleTripMap"></div>
			<div class='button-group'>
				<button class='btn btn-info renameTrip'>Rename Trip</button>
				<button class='btn btn-danger deleteTrip'>Delete Trip</button>
			</div>
		`
		$('.rightSide').html(html)
			initMap()
		$('.renameTrip').click(function(){
			tripEditor.render()
		})
		$('.deleteTrip').click(function(){
			handlers.deleteTrip()
		})
	}
	
	return {
		render, bounds
	}

})()

