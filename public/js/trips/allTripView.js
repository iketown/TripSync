const allTripView = (function(){

	const bounds = new google.maps.LatLngBounds;
	let map;


	function initMap(){

	map = new google.maps.Map(document.getElementById('googleAllTrips'), {
				// zoom: 8,
				center: {
					lat:store.trips[0].tripLegs[0].startLoc.lat, 
					lng: store.trips[0].tripLegs[0].startLoc.lng
				},
				styles: store.mapStyle,
				disableDefaultUI: true
			})
		if (store.trips.length){
			addLegsToBounds()
			addLines()
			map.setCenter( bounds.getCenter() )
			map.fitBounds( bounds, {top: 5, bottom: 5, left: 5, right: 5} )
		}
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
	function makeArrow(color){

	}



	const render = ()=>{
		let allTripHtml = `
			<h1> My Trips </h1>
			<div id="googleAllTrips"></div>
		`
		$('.rightSide').html(allTripHtml)
		initMap()
	}

	return {
		render,
	}
})()