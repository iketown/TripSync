const listeners = function(){


		$('.rightSide').on('submit','#newTripForm', newHandlers.addTrip )
		$('.rightSide').on('submit', '#updateTripForm', newHandlers.updateTrip)
		// $('#newTripForm').submit(newHandlers.addTrip)
		// $('#updateTripForm').submit(newHandlers.updateTrip)


}