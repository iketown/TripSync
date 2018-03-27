const attachListeners = () => {
	console.log('attaching listeners')

	
	const googleAuto = ()=>{
			// google places autocomplete
			const startInput = document.getElementById("startLoc")
			const endInput = document.getElementById("endLoc") 
			const startAutoComplete = new google.maps.places.Autocomplete(startInput)
			const endAutoComplete = new google.maps.places.Autocomplete(endInput)
	
			startAutoComplete.addListener('place_changed', startACHandler);
			endAutoComplete.addListener('place_changed', endACHandler);
	
			function startACHandler(){
				const place = startAutoComplete.getPlace();
				store.startLocTemp = place; // temporary container
			}
			function endACHandler(){
				const place = endAutoComplete.getPlace();
				store.endLocTemp = place // temporary container
			}
		}
	googleAuto() 

	const parseLocation = (goog)=>{
		if(!goog) return null;
		obj = {};
		 try { obj.city = goog.address_components.find(a=>a.types.includes('locality')).long_name } catch(e) { console.log('no city') }
		 try {obj.cityLong = goog.address_components.find(a=>a.types.includes('administrative_area_level_3')).long_name } catch(e) { console.log('no admin3')}
		try {obj.state = goog.address_components.find(a=>a.types.includes('administrative_area_level_1')).long_name } catch(e) {console.log('no admin1')}
		obj.lat = goog.geometry.location.lat()
		obj.lng = goog.geometry.location.lng()
		obj.name = goog.name
		obj.place_id = goog.place_id
		obj.utcOffset = goog.utc_offset
		obj.address = goog.formatted_address
		obj.phone = goog.formatted_phone_number
		console.log('parseLocation', obj)
		return obj;
	}

	// // addLegToTrip open form
	// $('.leftSide').on('click', '.addLegToTrip', function(e){
	// 	$('.rightSide').html(render.legForm()) 
	// 	attachListeners();
	// })

	// change Location listeners
	$('.rightSide').on('click', '.changeLoc.start', function(e){
		$('.startLocSwap').html(render.locToggle({}, 'start'))
		googleAuto()
	})
	$('.rightSide').on('click', '.changeLoc.end', function(e){
		$('.endLocSwap').html(render.locToggle({}, 'end'))
		googleAuto()
	})

	// addLegToTrip form submit listener
	$('#saveLeg').click(function(e){
		e.preventDefault()
		const $form = $(this).closest('form')
		const sendObj = {}
		const tripId = $(this).attr('tripId')
		sendObj.type = $form.find('#type').val()
		sendObj.company = $form.find('#company').val()
		sendObj.flightNum = $form.find('#flightNum').val()
		sendObj.startDate = $form.find('#startDate').val()
		sendObj.endDate = $form.find('#endDate').val()
		sendObj.startTime = $form.find('#startTime').val()
		sendObj.endTime = $form.find('#endTime').val()
		sendObj.startLoc = parseLocation(store.startLocTemp) || ''
		sendObj.endLoc = parseLocation(store.endLocTemp) || ''
		sendObj.travelerIds = []
			$('.travCheckBox').each(function(){
				if (this.checked) sendObj.travelerIds.push( $(this).val() ) 
			})
		handlers.addLegToTrip(sendObj, tripId)
	})
	// LISTENER to page thru events
		$('.topRow').on('click', '#prevTrips', ()=>{ store.trips.maxIndex -= 2;  render.trips()})
		$('.topRow').on('click', '#nextTrips', ()=>{ store.trips.maxIndex += 2;  render.trips()})
		
	// LISTENER to view a trip
	$('.topRow').on('click', '.viewTrip', function(e){
		let tripId = $(this).attr('tripId')
		let trip = store.trips.find( trip=> trip._id === tripId )
		store.trips.current = trip
		render.showTrip(trip)
	})
	// LISTENER to add leg or event to trip
	
	$('.leftSide').on('click', '.addEventToTrip', function(e){
		console.log(`adding event to ${store.trips.current.name}`)
	})

	// create new trip from top row LISTENER
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


	$('.leftSide').on('click', '.updateLeg', function(e){
		let legId = $(this).attr('legId')
		$('.rightSide').html(render.legForm(legId))
	})
	


}

