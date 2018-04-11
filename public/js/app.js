$(function() {

	api.getEventsOnLoad()
		.then(data => {
			store.trips = data.myTrips;
			store.setTimeRanges()
			store.me = data.me
			store.users = data.me.travelers;
			tripRender.accordion()
			userHeader.render()
			homeRender.nav()
			tripRender.allTrips()
			addListeners()
		}).catch(err => {
			// console.log('error', err)
			homeRender.nav()
			homeRender.intro()
			homeRender.signInForm()
			addListeners()
		})


})