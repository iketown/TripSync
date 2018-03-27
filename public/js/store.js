
	const store = (()=>{

		const trips = []
		
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
			axios.get('/admin/users/store')
				.then(r => this.me = r.data)
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

		return {
			getEventsOnLoad,
			airlines,
			legTypes,
			sortTrips,
			setTimeRanges,
		}
	})()