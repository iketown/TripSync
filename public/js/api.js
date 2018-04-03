const api = (function(){



		function getEventsOnLoad(events){
			return axios.get('/admin')
				.then(response => {
					console.log('response from get events', response.data)
					store.trips = response.data.myTrips;
					store.setTimeRanges()
					store.me = response.data.me
					// setup my users
					store.users = response.data.me.travelers;
					return 'hay'
				})
				// .catch(err=> console.log('error from getevents', err))
		}



	return {
		getEventsOnLoad,

	}
})()