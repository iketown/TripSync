const tripView = {

	render: ()=>{
		const trip = store.trips.current
		html = `
			<h2>${trip.name.toUpperCase()}</h2>
			<div id="googleMap"></div>
		`
		$('.rightSide').html(html)
	}






}