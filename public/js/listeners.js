const listeners = function(){


		$('.rightSide').on('submit','#newTripForm', handlers.addTrip )
		$('.rightSide').on('submit', '#updateTripForm', handlers.updateTrip)
		// $('#newTripForm').submit(handlers.addTrip)
		// $('#updateTripForm').submit(handlers.updateTrip)


}