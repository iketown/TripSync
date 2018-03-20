$( function(){
	// renderUsers.dom()
	// attachListeners()
	console.log('appjs called')
	console.log(api.hi)
	axios.get('/admin/events/store')
		.then(events => store.events = events.data)
	
	






} )