$( function(){

	api.getEventsOnLoad()
	.then(function(response){
		console.log('response from app', response)
		// store.addStartupData()
		tripList.render()
		userHeader.render()
		signInOut.renderNav()
	}).catch(err=>{
		// console.log('error', err)
		signInOut.renderNav()      
		signInOut.renderIntro()
		signInOut.renderSignInForm()
	})


	// store.getEventsOnLoad();
	// attachListeners()
	

	// toastr.options = { "positionClass": "toast-bottom-left" }	





} )