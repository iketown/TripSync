const newHandlers = (function(){

	const selectLeg = function(){
		let legId = $(this).attr('legId')
		let leg = store.trips.current.tripLegs.find(leg => leg._id === legId)
		store.trips.currentLeg = leg
		$(this).closest('#tripFullList').find('.legListItem').removeClass('selectedLeg')
		$(this).addClass('selectedLeg')
		legRender.edit()
		userHeader.render()
	}
	const addLegToTrip = function(){
		let tripId = $(this).attr('tripId')
		store.trips.currentLeg = {}
		legRender.edit()
	}
	const selectTrip = function(){
		store.trips.currentLeg = null
		userHeader.render()
		let tripId = $(this).attr('tripId')
		const trip = store.trips.find(trip=> trip._id === tripId)
		store.trips.current = trip
		tripRender.viewTrip()
	}
	const hoverLeg = function(){
		const legId = $(this).find('.legShow').attr('legId')
		const line = store.trips.current.tripLegs.find(leg=> leg._id === legId).line
		line.setOptions(store.mapArrowOptions.selected)
	}
	const unhoverLeg = function(){
		const legId = $(this).find('.legShow').attr('legId')
		const line = store.trips.current.tripLegs.find(leg=> leg._id === legId).line
		line.setOptions(store.mapArrowOptions.unSelected) 
	}
	const addNewTrip = function(){
		store.trips.current = null
		tripEditor.render()
	}

	return {
		selectLeg,
		addLegToTrip,
		selectTrip,
		hoverLeg,
		unhoverLeg,
		addNewTrip,
		 
	}
})()