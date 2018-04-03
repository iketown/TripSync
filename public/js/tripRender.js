const tripRender = (function(){

	const allTrips = ()=>{
		html = `
			<h1> My Trips </h1>
			<div id="googleAllTrips"></div>`
		$('.rightSide').html(html)
		mapRender.allTrips()
	}

	return {
		allTrips,

	}

})()