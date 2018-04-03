$( function(){

	api.getEventsOnLoad()
	.then(function(response){
		console.log('response from app', response)
		tripRender.accordion()
		userHeader.render()
		homeRender.nav()
		tripRender.allTrips()
	}).catch(err=>{
		// console.log('error', err)
		homeRender.nav()      
		homeRender.intro()
		homeRender.signInForm()
	})


	// store.getEventsOnLoad();
	// attachListeners()
	

	// toastr.options = { "positionClass": "toast-bottom-left" }	





} )