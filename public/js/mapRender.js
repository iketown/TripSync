const mapRender = (function(){


	function allTrips(){

		const bounds = new google.maps.LatLngBounds;
		let map;
		map = new google.maps.Map(document.getElementById('googleAllTrips'), {
				styles: store.mapStyle,
				disableDefaultUI: true
			})
		if (store.trips.length){
			addLegsToBounds()
			addLines()
			map.setCenter( bounds.getCenter() )
			map.fitBounds( bounds, {top: 10, bottom: 10, left: 10, right: 10} )
		}
		function addLegsToBounds(){
			store.trips.forEach(trip=>{
				trip.tripLegs.forEach(leg=>{
					let startLat = leg.startLoc.lat
					let startLng = leg.startLoc.lng
					let endLat = leg.endLoc.lat
					let endLng = leg.endLoc.lng
					const start = new google.maps.LatLng(startLat, startLng)
					const end = new google.maps.LatLng(endLat, endLng)
					bounds.extend(start)
					bounds.extend(end)
				})
			})
		}
		function addLines(){
			store.trips.forEach((trip, i)=>{
				let color = store.colors[i]
				trip.tripLegs.forEach(leg=>{
					const start = new google.maps.LatLng(leg.startLoc.lat, leg.startLoc.lng)
					const end = new google.maps.LatLng(leg.endLoc.lat, leg.endLoc.lng)				
					leg.line = new google.maps.Polyline({
						path: [start, end],
						strokeWeight: 1,
						strokeColor: color,
						geodesic: true,
						icons: [{
							icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 1},
							offset: '100%'
			            }] 
					})
					leg.line.setMap(map)				
				})
			})
		}
	} // end all trips

	function trip(){
		let bounds;

		if (store.trips.current.tripLegs.length) {
			bounds = new google.maps.LatLngBounds();
			map = new google.maps.Map(document.getElementById('googleTripMap'), {
				styles: store.mapStyle,
				disableDefaultUI: true
			})
			store.trips.current.tripLegs.forEach(leg=> makeArrowAndExtendBounds(leg))
			map.setCenter( bounds.getCenter() )
			map.fitBounds( bounds, {top: 10, bottom: 10, left: 10, right: 10} )
		}
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
			bounds.extend(start)
			bounds.extend(end)
		}

	}

	function leg(){
		if (store.trips.currentLeg && store.trips.currentLeg._id){
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
		 		styles: store.mapStyle,
		 		disableDefaultUI: true
			 	})
			const tripLine = new google.maps.Polyline({
				path: [start, end],
				strokeWeight: 1,
				geodesic: true,
				icons: [{
	                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2,strokeColor: 'red' },
	                offset: '100%',
	                
	            }] 
			}).setMap(map)
		 	// const startMarker = new google.maps.Marker({
		 	// 	position: start,
		 	// 	icon: {
			 //      path: google.maps.SymbolPath.CIRCLE,
			 //      scale: 4,
			 //      strokeColor: 'green'
			 //    },
		 	// 	map: map
		 	// })
		 	map.fitBounds(bounds, {top: 10, bottom: 10, left: 10, right: 10})
		}
	}



	return {
		allTrips,
		trip,
		leg,
	}
})()