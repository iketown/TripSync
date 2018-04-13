const addListeners = function() {


	$('.rightSide').on('submit', '.signInForm', handlers.signIn)
	$('.rightSide').on('click', '#signUpButton', handlers.signUpButton)
	$('.rightSide').on('submit', '#newTripForm', handlers.addTrip)
	$('.rightSide').on('submit', '#updateTripForm', handlers.updateTrip)
	$('.rightSide').on('click', '.renameTrip', tripRender.edit)
	$('.rightSide').on('click', '.deleteTrip', handlers.deleteTrip)
	$('.rightSide').on('click', '.addLegToTrip', handlers.newLegForm)
	$('.rightSide').on('click', '#deleteLeg', handlers.deleteLeg)
	$('.rightSide').on('submit', '.signUpForm', handlers.signUp)
	$('.rightSide').on('click', '.linkLegFromUser', handlers.linkLegFromUser)
	$('.rightSide').on('click', '#removeUser', handlers.removeUser )
	$('.leftSide').on('click', '.addNewTrip', handlers.newTripForm)
	$('.leftSide').on('click', '.legListItem', handlers.selectLeg)
	$('.leftSide').on('click', '.addLegToTrip', handlers.newLegForm)
	$('.leftSide').on('click', '.expandTripButton', handlers.selectTrip)

	



}