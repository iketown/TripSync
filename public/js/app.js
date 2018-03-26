$( function(){

	store.getEventsOnLoad();
	attachListeners()

	$('.topRow').on('click', '#newTripButton' ,  function(event) {
		const name = $('#tripName').val()
		$('#tripName').val('')
		axios.post('/admin/trips/', {name})
			.then(response=> {
				console.log(response.data)
				store.trips.push(response.data)
				store.maxIndex = 1;
				render.trips()
			})
			.catch(err=> console.log(err))
	});

	// LISTENER to page thru events
		$('.topRow').on('click', '#prevTrips', ()=>{ store.trips.maxIndex -= 2;  render.trips()})
		$('.topRow').on('click', '#nextTrips', ()=>{ store.trips.maxIndex += 2;  render.trips()})
		
	// LISTENER to view a trip
	$('.topRow').on('click', '.viewTrip', function(e){
		let tripId = $(this).attr('tripId')
		let trip = store.trips.find( trip=> trip._id === tripId )
		store.trips.current = trip
		tripRender = render.showTrip(trip)
		$('.leftSide').html(tripRender)
	})
	// LISTENER to add leg or event to trip
	
	$('.leftSide').on('click', '.addEventToTrip', function(e){
		console.log(`adding event to ${store.trips.current.name}`)
	})

	// $('.topRow').html('<h2>My Trips</h2>')
	$('.leftSide').text('hey whats up left side')
	// $('.rightSide').text('hey whats up right side')
	





} )