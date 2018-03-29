
	const store = (()=>{

		const trips = []
		const users = []
		
		const sortTrips = function(){
			console.log('sorting trips')
			this.trips.forEach(trip => trip.tripLegs.sort( (a,b)=> a.startTime - b.startTime ) )
			this.trips.sort((a,b) => a.timeRange.startTime - b.timeRange.startTime )
		}

		const setTimeRanges = function(){
			this.trips.forEach(trip=>{
				let timeArr=[]
				trip.tripLegs.forEach(leg=>{
					timeArr.push(leg.startTime)
					timeArr.push(leg.endTime)
				})
				trip.timeRange = {startTime: Math.min(...timeArr), endTime: Math.max(...timeArr)}
			})
			this.sortTrips()
		}

		function getEventsOnLoad(events){
			axios.get('/admin/trips/')
				.then(results => {
					this.trips = results.data
					this.setTimeRanges()
					this.trips.maxIndex = 1
					// render.trips() 
					tripList.render()
				})
			axios.get('/admin/users')
				.then(r => {
					this.users = r.data.travelers
					userHeader.render()
					}
				)
				.catch(err=> console.log(err))
		}

		const airlines = [
			{name: "Alaska", logoUrl: '', abbr: ''}, 
			{name: "Allegiant", logoUrl: '', abbr: ''}, 
			{name: "American", logoUrl: '', abbr: ''}, 
			{name: "Delta", logoUrl: '', abbr: ''}, 
			{name: "Frontier", logoUrl: '', abbr: ''}, 
			{name: "Hawaiian", logoUrl: '', abbr: ''}, 
			{name: "JetBlue", logoUrl: '', abbr: ''}, 
			{name: "Southwest", logoUrl: '', abbr: ''}, 
			{name: "Spirit", logoUrl: '', abbr: ''}, 
			{name: "United", logoUrl: '', abbr: ''}, 
			{name: "Uber", logoUrl: '', abbr: ''}, 
			{name: "Lyft", logoUrl: '', abbr: ''}, 
			{name: "Other", logoUrl: '', abbr: ''}
		]
		const legTypes = [
			"Flight",
			"Ground",
			"Other",
		]
		const mapArrowOptions = {
			selected: {strokeColor: 'salmon', strokeWeight: 3, zIndex: 2},
			unSelected: {strokeWeight: 1,
						strokeColor: 'black',
						geodesic: true,
						zIndex: 1,
						icons: [{
							icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2},
							offset: '100%'
			            }]} 
		}
			const peopleSVGs = [ "woman.svg", "man-1.svg", "woman-1.svg", "man-2.svg", "woman-2.svg", "man-3.svg", "woman-3.svg", "man-4.svg", "man-5.svg", "woman-4.svg", "man-6.svg", "woman-5.svg", "man-7.svg", "woman-6.svg", "punk.svg", "woman-7.svg"]

		

		const mapStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

		return {
			getEventsOnLoad,
			airlines,
			legTypes,
			sortTrips,
			setTimeRanges,
			mapArrowOptions,
			mapStyle,
			peopleSVGs
		}
	})()